import { getJson, setJson } from './client.js';
import { STORAGE_KEYS } from './keys.js';

const accountKey = (name) => name.trim().toLowerCase();

export async function listAccounts() {
    return getJson(STORAGE_KEYS.users, {});
}

export async function getAccount(name) {
    return (await listAccounts())[accountKey(name)];
}

export async function createAccount(user) {
    const accounts = await listAccounts();
    accounts[accountKey(user.name)] = user;
    await setJson(STORAGE_KEYS.users, accounts);
    return user;
}
