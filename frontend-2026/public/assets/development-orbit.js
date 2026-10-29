(() => {
  const stage = document.querySelector('.dev-orbit-stage');
  if (!stage) return;
  const layout = document.querySelector('.dev-orbit-layout');
  const nodes = [...stage.querySelectorAll('[data-orbit-index]')];
  const cases = window.BonZuttnerDevelopmentCases;
  const dialog = document.querySelector('.dev-project-dialog');
  const pause = document.querySelector('[data-orbit-pause]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fields = Object.fromEntries(['meta', 'category', 'title', 'partner', 'detail', 'count', 'open'].map(key => [key, document.querySelector(`[data-orbit-${key}]`)]));
  const points = cases.map((_, index) => ({ longitude: index * Math.PI * 2 / cases.length, latitude: (index % 2 ? -1 : 1) * .58 }));
  let width = 0, height = 0, radius = 0;
  let yaw = 0, targetYaw = null, targetIndex = null;
  let selected = -1, previewIndex = null, hovered = false, inView = false;
  let running = !reducedMotion.matches, inertia = 0, drag = null;
  let suppressClickUntil = 0, lastTime = 0;

  function select(index) {
    if (index === selected) return;
    selected = index;
    const item = cases[index];
    fields.meta.textContent = `${projectUI.heading} ${item.number}`;
    fields.category.textContent = localized(item.type);
    fields.title.textContent = localized(item.title);
    fields.partner.textContent = item.featured ? projectUI.featured : '';
    fields.partner.hidden = !item.featured;
    fields.detail.textContent = localized(item.short);
    fields.open.dataset.project = item.id;
    fields.count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cases.length).padStart(2, '0')}`;
  }

  function render() {
    let front = 0, nearest = -Infinity;
    const latitudeScale = width < 480 ? 1.13 : 1;
    nodes.forEach((node, index) => {
      const point = points[index];
      const angle = point.longitude + yaw;
      const latitude = point.latitude * latitudeScale;
      const x = Math.sin(angle) * Math.cos(latitude) * radius;
      const depth = Math.cos(angle) * Math.cos(latitude) * radius;
      const y = -Math.sin(latitude) * radius;
      const scale = .73 + .27 * ((depth / radius + 1) / 2);
      const frontFacing = depth > -radius * .02;
      node.style.left = `${width / 2 + x}px`;
      node.style.top = `${height / 2 + y}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale})`;
      node.style.zIndex = frontFacing ? String(30 + Math.round(depth / radius * 100)) : '1';
      node.style.opacity = frontFacing ? String(.65 + .35 * Math.max(0, depth / radius)) : '.16';
      node.style.pointerEvents = frontFacing ? 'auto' : 'none';
      node.tabIndex = frontFacing ? 0 : -1;
      node.setAttribute('aria-hidden', String(!frontFacing));
      if (depth > nearest) { nearest = depth; front = index; }
    });
    select(previewIndex ?? targetIndex ?? front);
    stage.style.setProperty('--orbit-angle', `${yaw * 180 / Math.PI}deg`);
  }

  function resize() {
    width = stage.clientWidth;
    height = stage.clientHeight;
    radius = Math.max(95, Math.min(width * .34, 240));
    stage.style.setProperty('--orbit-diameter', `${radius * 2}px`);
    render();
  }

  function updatePause() {
    pause.textContent = running ? orbitUI.pause : orbitUI.play;
    pause.setAttribute('aria-pressed', String(!running));
  }

  function choose(index) {
    index = (index + cases.length) % cases.length;
    const desired = -points[index].longitude;
    const delta = Math.atan2(Math.sin(desired - yaw), Math.cos(desired - yaw));
    inertia = 0;
    previewIndex = null;
    targetIndex = index;
    targetYaw = yaw + delta;
    if (reducedMotion.matches) { yaw = targetYaw; targetYaw = null; targetIndex = null; }
    render();
  }

  document.querySelector('[data-orbit-previous]').addEventListener('click', () => choose(selected - 1));
  document.querySelector('[data-orbit-next]').addEventListener('click', () => choose(selected + 1));
  pause.addEventListener('click', () => { running = !running; inertia = 0; updatePause(); });
  layout.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') hovered = true; });
  layout.addEventListener('pointerleave', () => { hovered = false; previewIndex = null; });
  nodes.forEach((node, index) => {
    node.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && !drag?.moved) { previewIndex = index; select(index); } });
    node.addEventListener('focus', () => { previewIndex = index; select(index); });
  });
  layout.addEventListener('focusout', event => { if (!layout.contains(event.relatedTarget)) previewIndex = null; });
  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      choose(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    inertia = 0;
    targetYaw = null;
    targetIndex = null;
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, time: event.timeStamp, moved: false };
  });
  stage.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    if (!drag.moved && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
      drag.moved = true;
      previewIndex = null;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('is-dragging');
    }
    if (!drag.moved) return;
    const step = (event.clientX - drag.x) * .006;
    const dt = Math.max(8, event.timeStamp - drag.time);
    yaw += step;
    inertia = Math.max(-.008, Math.min(.008, step / dt));
    drag.x = event.clientX;
    drag.time = event.timeStamp;
    event.preventDefault();
    render();
  });
  function release(event) {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.moved) suppressClickUntil = performance.now() + 350;
    if (event.type === 'pointercancel' || reducedMotion.matches) inertia = 0;
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    drag = null;
    stage.classList.remove('is-dragging');
  }
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  reducedMotion.addEventListener('change', () => { running = !reducedMotion.matches; inertia = 0; updatePause(); });
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: .08 }).observe(stage);
  function tick(time) {
    const dt = lastTime ? Math.min(40, time - lastTime) : 16;
    lastTime = time;
    if (inView && !document.hidden && !dialog.open && !drag?.moved) {
      let changed = false;
      if (targetYaw !== null) {
        const distance = targetYaw - yaw;
        yaw += distance * (1 - Math.exp(-dt / 110));
        if (Math.abs(distance) < .002) { yaw = targetYaw; targetYaw = null; targetIndex = null; }
        changed = true;
      } else if (Math.abs(inertia) > .00002 && !reducedMotion.matches) {
        yaw += inertia * dt;
        inertia *= Math.pow(.92, dt / 16);
        changed = true;
      } else if (running && !hovered && !layout.contains(document.activeElement)) {
        yaw += dt * .000075;
        changed = true;
      }
      if (changed) render();
    }
    requestAnimationFrame(tick);
  }
  resize();
  updatePause();
  requestAnimationFrame(tick);
})();
