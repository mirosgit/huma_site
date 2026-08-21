const port = Number(process.env.PORT ?? 4173);

export default {
    name: 'dev',
    baseUrl: `http://localhost:${port}`,

    staticServer: {
        enabled: true,
        port,
        folder: process.env.APP_DIR ?? '../app',
    },

    browser: {
        headless: process.env.HEADLESS !== 'false',
        windowSize: '1280,1024',
    },

    timeouts: {
        waitfor: Number(process.env.WAIT_TIMEOUT ?? 10_000),
        step: Number(process.env.STEP_TIMEOUT ?? 60_000),
    },

    execution: {
        maxInstances: Number(process.env.MAX_INSTANCES ?? 4),
        retries: Number(process.env.RETRIES ?? 0),
        logLevel: process.env.LOG_LEVEL ?? 'error',
    },
};
