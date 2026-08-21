export default {
    name: 'stage',

    get baseUrl() {
        const url = process.env.BASE_URL;
        if (!url) {
            throw new Error('BASE_URL must be set for the "stage" environment (see .env.example)');
        }
        return url;
    },

    staticServer: {
        enabled: false,
    },

    browser: {
        headless: process.env.HEADLESS !== 'false',
        windowSize: '1280,1024',
    },

    timeouts: {
        waitfor: Number(process.env.WAIT_TIMEOUT ?? 20_000),
        step: Number(process.env.STEP_TIMEOUT ?? 90_000),
    },

    execution: {
        maxInstances: Number(process.env.MAX_INSTANCES ?? 2),
        retries: Number(process.env.RETRIES ?? 0),
        logLevel: process.env.LOG_LEVEL ?? 'error',
    },
};
