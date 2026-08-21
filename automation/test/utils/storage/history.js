import { createAccount, getAccount } from './accounts.js';

export async function getHistory(name) {
    return (await getAccount(name))?.history ?? [];
}

export async function setHistory(name, history) {
    const account = await getAccount(name);
    if (!account) {
        throw new Error(`Cannot set history: no account named "${name}"`);
    }
    return createAccount({ ...account, history });
}
