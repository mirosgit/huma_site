import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { navbar } from '../components/navbar.component.js';
import { elementNamed, interactable, screenNamed, waitForScreen } from '../utils/ui.utils.js';
import { aGeneratedName } from '../data/users.js';

const resolve = (world, text) => (text.includes('<name>') ? text.replaceAll('<name>', world.requirePlayer()) : text);

const navbarActions = new Map([
    ['Log Out button', () => navbar.logout()],
    ['Profile link', () => navbar.goTo('profile')],
]);

const navbarElements = new Map([
    ['greeting', () => navbar.greeting],
    ['navigation bar', () => navbar.root],
]);

const elementUnderTest = (name) => navbarElements.get(name)?.() ?? elementNamed(name);


Given('I wait for the {string} to be interactable', async function (name) {
    await interactable(name);
});


When('I click the {string}', async function (name) {
    const navbarAction = navbarActions.get(name);
    if (navbarAction) {
        await navbarAction();
        return;
    }
    await (await interactable(name)).click();
});

When('I enter a generated name into the {string}', async function (name) {
    this.currentPlayer = aGeneratedName();
    await (await interactable(name)).setValue(this.currentPlayer);
});

When('I enter my name into the {string}', async function (name) {
    await (await interactable(name)).setValue(this.requirePlayer());
});

When('I enter my name in lower case into the {string}', async function (name) {
    await (await interactable(name)).setValue(this.requirePlayer().toLowerCase());
});

When('I enter {string} into the {string}', async function (text, name) {
    await (await interactable(name)).setValue(text);
});

When('I clear the {string}', async function (name) {
    await (await interactable(name)).clearValue();
});

When('I select {string} in the {string}', async function (value, name) {
    await (await interactable(name)).selectByAttribute('value', value);
});


Then('the {string} screen should be open', async function (screen) {
    await expect(screenNamed(screen)).toBeDisplayed();
});

Then('the {string} should read {string}', async function (name, text) {
    await expect(elementUnderTest(name)).toHaveText(resolve(this, text));
});

Then('the {string} should hold {string}', async function (name, value) {
    await expect(elementNamed(name)).toHaveValue(value);
});

Then('the {string} should not be shown', async function (name) {
    await expect(elementUnderTest(name)).not.toBeExisting();
});

Then('the welcome form should be in {string} mode', async function (mode) {
    await waitForScreen('welcome');
    await expect(screenNamed('welcome')).toHaveAttribute('data-mode', mode);
});
