import { getItem, setItem } from './client.js';
import { STORAGE_KEYS } from './keys.js';
import { createAccount } from './accounts.js';

export async function getSession() {
    return getItem(STORAGE_KEYS.session);
}

export async function signInAs(user) {
    await createAccount(user);
    await setItem(STORAGE_KEYS.session, user.name);
    return user;
}
