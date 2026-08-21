import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { createAccount, getAccount, getSession, listAccounts, signInAs } from '../utils/storage/index.js';
import { reloadApplication } from '../utils/app.utils.js';
import { aGeneratedName, aUser } from '../data/users.js';
import { waitForScreen } from '../utils/ui.utils.js';


Given('my account already exists playing on {string}', async function (difficulty) {
    this.currentPlayer = aGeneratedName();
    await createAccount(aUser({ name: this.currentPlayer, difficulty }));
});

Given('I am signed in with a generated name playing on {string}', async function (difficulty) {
    this.currentPlayer = aGeneratedName();
    await signInAs(aUser({ name: this.currentPlayer, difficulty }));
    await reloadApplication();
    await waitForScreen('play');
});

Given('I am signed in as {string} playing on {string}', async function (name, difficulty) {
    this.currentPlayer = name;
    await signInAs(aUser({ name, difficulty }));
    await reloadApplication();
    await waitForScreen('play');
});


Then('my account should be stored on {string} with an empty history', async function (difficulty) {
    const account = await getAccount(this.requirePlayer());
    expect(account).toBeDefined();
    expect(account.name).toBe(this.requirePlayer());
    expect(account.difficulty).toBe(difficulty);
    expect(account.history).toEqual([]);
});

Then('my account should still exist', async function () {
    expect(await getAccount(this.requirePlayer())).toBeDefined();
});

Then('my account should no longer exist', async function () {
    expect(await getAccount(this.requirePlayer())).toBeUndefined();
});

Then('no account should have been created', async function () {
    expect(Object.keys(await listAccounts())).toHaveLength(0);
});

Then('there should be no open session', async function () {
    expect(await getSession()).toBeNull();
});
