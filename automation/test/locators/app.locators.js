
const byTestId = (testId) => '[data-testid="' + testId + '"]';

const ELEMENT_TEST_IDS = Object.freeze({
    'name field': 'input-name',
    'Create Account button': 'btn-register',
    'Log In button': 'btn-login',
    'switch mode link': 'btn-switch-mode',
    'error message': 'auth-error',
    greeting: 'hello-user',
    'Log Out button': 'btn-logout',
    status: 'status',
    'difficulty selector': 'select-difficulty',
    'New Game button': 'btn-new',
    'Hint button': 'btn-hint',
    'Delete Account button': 'btn-delete-account',
    'Profile link': 'nav-profile',
    'navigation bar': 'nav',
});

const SCREEN_TEST_IDS = Object.freeze({
    welcome: 'auth-form',
    play: 'view-play',
    profile: 'view-profile',
});

const known = (map, name, what) => {
    if (!Object.hasOwn(map, name)) {
        throw new Error(`Unknown ${what} "${name}". Known: ${Object.keys(map).join(', ')}`);
    }
    return map[name];
};

export const locators = Object.freeze({
    element: (name) => byTestId(known(ELEMENT_TEST_IDS, name, 'element')),
    screen: (name) => byTestId(known(SCREEN_TEST_IDS, name, 'screen')),
    cell: (index) => byTestId('cell-' + index),
});
