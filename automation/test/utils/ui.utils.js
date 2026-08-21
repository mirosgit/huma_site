import { locators } from '../locators/app.locators.js';

export const elementNamed = (name) => $(locators.element(name));

export const screenNamed = (name) => $(locators.screen(name));

export async function waitUntilInteractable(element, name) {
    await element.waitForClickable({
        timeoutMsg: `"${name}" (${locators.element(name)}) never became interactable`,
    });
    return element;
}

export async function interactable(name) {
    return waitUntilInteractable(elementNamed(name), name);
}
export async function waitForScreen(name) {
    await screenNamed(name).waitForDisplayed({
        timeoutMsg: `The "${name}" screen never appeared`,
    });
}
