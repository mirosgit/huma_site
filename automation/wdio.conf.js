import 'dotenv/config';

/**
 * The environment is chosen with `ENV` (see `.env`), and every environment lives
 * in its own file under `config/`. Nothing environment-specific is hard-coded
 * below - this file only describes *how* to run, never *where*.
 */
const environmentName = process.env.ENV ?? 'dev';
const { default: environment } = await import(`./config/${environmentName}.js`);

const chromeArgs = [
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-search-engine-choice-screen',
    `--window-size=${environment.browser.windowSize}`,
    // Keeps the SUT's timing behaviour comparable across machines.
    '--force-prefers-reduced-motion',
    ...(environment.browser.headless ? ['--headless=new'] : []),
];

const specReporter = ['spec', { symbols: { passed: '[PASS]', failed: '[FAIL]' }, realtimeReporting: true }];

/** Allure gives a browsable report, with a screenshot for every failure. */
const allureReporter = [
    'allure',
    {
        outputDir: './reports/allure-results',
        /**
         * Report the Gherkin steps, not the wire traffic underneath them.
         *
         * With this off, every WebDriver command becomes its own step with its
         * request and response attached - a single `waitForClickable` shows up
         * as a `findElement` and three nested `executeScript`s, and the run's
         * own `Before` hook appears above the scenario as four unexplained
         * commands. The report is for reading what the test did, not what the
         * protocol did.
         */
        disableWebdriverStepsReporting: true,
        /** A screenshot taken on failure is attached to the step that failed. */
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
    },
];

export const config = {
    runner: 'local',

    // --------------------------------------------------------------- specs
    specs: ['./test/specs/**/*.feature'],

    /**
     * Two orthogonal axes, so neither one has to encode the other:
     *
     *   suites (folders)  - what part of the product a scenario is about.
     *                       Adding a module means a new folder and one line here.
     *   tags              - how risky it is and when to run it: `@smoke`,
     *                       `@regression`, `@e2e`, plus `@known-defect`.
     *
     * Folders deliberately do *not* encode the risk level. If they did, the
     * three registration scenarios would be split across three directories by
     * how urgent they are, and "where does a new auth test go?" would depend on
     * something other than what it tests.
     */
    suites: {
        auth: ['./test/specs/auth/**/*.feature'],
        game: ['./test/specs/game/**/*.feature'],
        profile: ['./test/specs/profile/**/*.feature'],
    },

    // ------------------------------------------------------------- runtime
    maxInstances: environment.execution.maxInstances,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': { args: chromeArgs },
            /**
             * `ignore` leaves the SUT's native confirmation dialogs open so a
             * scenario can read the message and then answer it in its own step.
             * Chrome's default ("dismiss and notify") would silently press
             * Cancel for us and make every confirmation flow untestable.
             */
            unhandledPromptBehavior: 'ignore',
            // Alert handling is only fully specified on WebDriver Classic today.
            'wdio:enforceWebDriverClassic': true,
        },
    ],

    logLevel: environment.execution.logLevel,
    bail: 0,
    baseUrl: environment.baseUrl,
    waitforTimeout: environment.timeouts.waitfor,
    connectionRetryTimeout: 120_000,
    connectionRetryCount: 3,
    specFileRetries: environment.execution.retries,

    // ------------------------------------------------------------ services
    // Only `dev` serves the SUT itself; `stage` runs against a deployed build.
    services: environment.staticServer.enabled
        ? [
              [
                  'static-server',
                  {
                      port: environment.staticServer.port,
                      folders: [{ mount: '/', path: environment.staticServer.folder }],
                  },
              ],
          ]
        : [],

    // ----------------------------------------------------------- framework
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./test/support/**/*.js', './test/steps/**/*.js'],
        // A step that is defined twice, or not at all, fails the run instead of
        // being quietly skipped and reported as a pass.
        strict: true,
        failAmbiguousDefinitions: true,
        ignoreUndefinedDefinitions: false,
        snippets: true,
        source: true,
        backtrace: false,
        /**
         * `@known-defect` scenarios are excluded by default.
         *
         * They assert what the application is *supposed* to do, so on this build
         * they fail - by design. Keeping them out of the default run leaves the
         * suite usable as a regression gate (green means nothing new broke),
         * while `npm run test:defects` runs exactly those and is expected to be
         * red until BUG-001 and BUG-002 are fixed. See docs/NOTES.md.
         */
        tags: process.env.TAGS ?? 'not @known-defect',
        timeout: environment.timeouts.step,
    },

    reporters: process.env.ALLURE === 'false' ? [specReporter] : [specReporter, allureReporter],

    // --------------------------------------------------------------- hooks
    // The scenario lifecycle - reset and dialog cleanup - is Cucumber's, and
    // lives in `test/support/hooks.js`. Only these two belong here.
    onPrepare: function () {
        // eslint-disable-next-line no-console
        console.log(`\nEnvironment: ${environment.name}  ->  ${environment.baseUrl}\n`);
    },

    /**
     * A failing step is worth a picture, attached to that step by the Allure
     * reporter.
     *
     * Guarded, and deliberately silent when it cannot be taken: a native dialog
     * left open by the failure blocks the screenshot command, and losing the
     * image must never cost us the failure that caused it.
     */
    afterStep: async function (_step, _scenario, { error }) {
        if (!error) return;
        try {
            await browser.takeScreenshot();
        } catch {
            // Nothing to photograph - the real failure is already reported.
        }
    },
};
