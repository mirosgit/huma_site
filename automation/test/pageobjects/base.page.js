import { locators } from '../locators/app.locators.js';

export class BasePage {
    constructor(rootName) {
        this.rootName = rootName;
        Object.freeze(this);
    }

    get root() {
        return browser.$(locators.screen(this.rootName));
    }

    async waitUntilLoaded() {
        await this.root.waitForDisplayed({
            timeoutMsg: `Timed out waiting for "${this.rootName}" to be displayed`,
        });
    }
}
