import { reset } from './storage/index.js';
import { pinRandomness } from './determinism.utils.js';

export async function resetApplication() {
    await browser.url('/');
    await reset();
    await browser.refresh();
    await pinRandomness();
}

export async function reloadApplication() {
    await browser.refresh();
    await pinRandomness();
}
