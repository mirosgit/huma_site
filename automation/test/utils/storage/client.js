import { STORAGE_KEYS } from './keys.js';

export const getItem = (key) => browser.execute((storageKey) => window.localStorage.getItem(storageKey), key);

export const setItem = (key, value) =>
    browser.execute((storageKey, storageValue) => window.localStorage.setItem(storageKey, storageValue), key, value);

export async function getJson(key, fallback) {
    const raw = await getItem(key);
    if (raw === null) return fallback;
    try {
        return JSON.parse(raw);
    } catch {
        throw new Error(`Value stored under "${key}" is not valid JSON: ${raw}`);
    }
}

export const setJson = (key, value) => setItem(key, JSON.stringify(value));

export async function reset() {
    await browser.execute((keys) => {
        keys.forEach((key) => window.localStorage.removeItem(key));
    }, Object.values(STORAGE_KEYS));
}
