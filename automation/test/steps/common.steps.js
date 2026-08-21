import { Then, When } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { modal } from '../components/modal.component.js';
import { reloadApplication } from '../utils/app.utils.js';


When('I reload the application', async function () {
    await reloadApplication();
});

Then('a dialog should ask {string}', async function (message) {
    expect(await modal.message()).toBe(message);
});

When('I confirm the dialog', async function () {
    await modal.confirm();
});

When('I dismiss the dialog', async function () {
    await modal.dismiss();
});
