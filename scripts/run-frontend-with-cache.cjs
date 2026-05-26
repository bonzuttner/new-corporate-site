const { spawn } = require("node:child_process");

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const mode = process.argv[2] === "start" ? "start" : "dev";

let schedulerTimer = null;
let isSyncRunning = false;
// Cross-platform npm command execution and emvironment compantablilty
function npmCommand() {
    return process.platform === "win32" ? "npm.cmd" : "npm";
}

function spawnNpm(scriptName) {
    const command = `${npmCommand()} run ${scriptName}`;
    return spawn(command, {
        stdio: "inherit",
        env: process.env,
        shell: true,
    });
}

function runNpmScript(scriptName, { failOnError = false } = {}) {
    return new Promise((resolve, reject) => {
        let child;
        try {
            child = spawnNpm(scriptName);
        } catch (error) {
            if (failOnError) {
                reject(error);
                return;
            }
            console.error(`[cache-runner] Failed to start ${scriptName}:`, error.message);
            resolve();
            return;
        }

        child.on("error", (error) => {
            if (failOnError) {
                reject(error);
                return;
            }
            console.error(`[cache-runner] Failed to run ${scriptName}:`, error.message);
            resolve();
        });

        child.on("exit", (code) => {
            if (code === 0) {
                resolve();
                return;
            }
            if (failOnError) {
                reject(new Error(`[cache-runner] ${scriptName} failed with exit code ${code}`));
                return;
            }
            console.warn(`[cache-runner] ${scriptName} exited with code ${code}. Continuing.`);
            resolve();
        });
    });
}

async function syncWithLock() {
    if (isSyncRunning) {
        console.log("[cache-runner] Previous sync is still running, skipping this cycle.");
        return;
    }

    isSyncRunning = true;
    try {
        await runNpmScript("db:sync");
    } finally {
        isSyncRunning = false;
    }
}

async function bootstrapCache() {
    console.log("[cache-runner] Initializing cache database.");
    await runNpmScript("db:init");

    console.log("[cache-runner] Running initial cache refresh.");
    await runNpmScript("db:sync");

    console.log("[cache-runner] Starting 6-hour cache refresh scheduler.");
    schedulerTimer = setInterval(() => {
        void syncWithLock();
    }, SIX_HOURS_MS);
}

function stopScheduler() {
    if (schedulerTimer) {
        clearInterval(schedulerTimer);
        schedulerTimer = null;
    }
}

async function main() {
    await bootstrapCache();

    const nextScript = mode === "start" ? "start:next" : "dev:next";
    const nextProcess = spawnNpm(nextScript);

    const shutdown = (signal) => {
        console.log(`[cache-runner] Received ${signal}. Stopping scheduler.`);
        stopScheduler();
        if (!nextProcess.killed) {
            nextProcess.kill(signal);
        }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    nextProcess.on("exit", (code) => {
        stopScheduler();
        process.exit(code ?? 0);
    });
}

main().catch((error) => {
    console.error("[cache-runner] Bootstrap failed, starting frontend anyway:", error.message);
    const nextScript = mode === "start" ? "start:next" : "dev:next";
    let nextProcess;
    try {
        nextProcess = spawnNpm(nextScript);
    } catch (spawnError) {
        console.error("[cache-runner] Failed to start frontend process:", spawnError.message);
        process.exit(1);
        return;
    }
    nextProcess.on("exit", (code) => process.exit(code ?? 0));
});
