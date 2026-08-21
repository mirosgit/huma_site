import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

/** Globals WebdriverIO injects into every step definition and page object. */
const wdioGlobals = {
    browser: 'readonly',
    driver: 'readonly',
    $: 'readonly',
    $$: 'readonly',
    expect: 'readonly',
};

export default [
    { ignores: ['node_modules/**', 'reports/**'] },
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: { ...globals.node, ...wdioGlobals },
        },
        rules: {
            'no-console': 'warn',
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            /**
             * `browser.pause()` and `browser.debug()` have no place in a
             * committed suite: the first makes tests slow and flaky, the second
             * hangs CI forever waiting for a human.
             */
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.object.name='browser'][callee.property.name='pause']",
                    message: 'Do not use browser.pause() - wait on state instead (see docs/NOTES.md).',
                },
                {
                    selector: "CallExpression[callee.object.name='browser'][callee.property.name='debug']",
                    message: 'browser.debug() blocks CI forever - remove it before committing.',
                },
            ],
        },
    },
    {
        /**
         * Callbacks passed to `browser.execute` are serialised and run inside
         * the page, so they legitimately reference `window` and `document`.
         */
        files: ['test/pageobjects/**/*.js', 'test/components/**/*.js', 'test/utils/**/*.js'],
        languageOptions: { globals: { ...globals.browser, ...wdioGlobals } },
    },
];
