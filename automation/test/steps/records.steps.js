import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { getHistory, setHistory } from '../utils/storage/index.js';
import { reloadApplication } from '../utils/app.utils.js';
import { aHistory } from '../data/users.js';

Given('my history is empty', async function () {
    expect(await getHistory(this.requirePlayer())).toEqual([]);
});

Given('my history contains a {string} and a {string}', async function (first, second) {
    await setHistory(this.requirePlayer(), aHistory([first, second]));
    await reloadApplication();
});

Then('my history should hold exactly one {string} game recorded as {string}', async function (difficulty, result) {
    expect(await getHistory(this.requirePlayer())).toEqual([
        expect.objectContaining({
            difficulty: difficulty.toLowerCase(),
            result: result.toLowerCase(),
        }),
    ]);
});
