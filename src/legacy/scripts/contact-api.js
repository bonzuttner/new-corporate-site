(() => {
  class ContactError extends Error {
    constructor(code, fields = {}) { super(code); this.code = code; this.fields = fields; }
  }
  window.BonZuttnerContactApi = {
    configured: () => !!window.BONZUTTNER_CONTACT?.endpoint,
    async submit(payload, requestId) {
      const config = window.BONZUTTNER_CONTACT || {};
      if (!config.endpoint) throw new ContactError('unavailable');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': requestId };
        if (config.csrfToken) headers['X-CSRF-Token'] = config.csrfToken;
        const response = await fetch(config.endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: controller.signal, credentials: 'same-origin' });
        let result;
        try { result = await response.json(); } catch { throw new ContactError(response.status === 429 ? 'rate-limit' : 'server'); }
        if (!response.ok) {
          if (response.status === 400 || response.status === 422) throw new ContactError('validation', result?.fieldErrors || {});
          throw new ContactError(response.status === 429 ? 'rate-limit' : 'server');
        }
        if (!result || result.ok !== true || typeof result.receiptId !== 'string' || !result.receiptId.trim()) throw new ContactError('server');
        return result;
      } catch (error) {
        if (error instanceof ContactError) throw error;
        throw new ContactError(error.name === 'AbortError' ? 'timeout' : 'network');
      } finally { clearTimeout(timeout); }
    }
  };
})();
