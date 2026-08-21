import { COMPUTER_MOVE_DELAY_MS } from '../data/constants.js';

export async function pinRandomness(value = 0) {
    await browser.execute((fixed) => {
        Object.defineProperty(Math, 'random', {
            value: () => fixed,
            configurable: true,
            writable: true,
        });
    }, value);
}

export const computerReplyTimeout = COMPUTER_MOVE_DELAY_MS * 8;
