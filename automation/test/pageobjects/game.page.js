import { BasePage } from './base.page.js';
import { locators } from '../locators/app.locators.js';
import { computerReplyTimeout } from '../utils/determinism.utils.js';

const SETTLED_STATUSES = ['your-turn', 'human', 'computer', 'draw'];

const CELL_SELECTORS = Array.from({ length: 9 }, (_, index) => locators.cell(index));

class GamePage extends BasePage {
    constructor() {
        super('play');
    }

    get status() {
        return browser.$(locators.element('status'));
    }

    cell(index) {
        return browser.$(locators.cell(index));
    }

    // ------------------------------------------------------------- reading

    async #observe(clickTargets) {
        return browser.execute(
            (cellSelectors, statusSelector, hintSelector, targets) => {
                const nodes = cellSelectors.map((selector) => document.querySelector(selector));
                const read = () => {
                    const cells = nodes.map((node) => node?.getAttribute('data-state') ?? null);
                    return {
                        cells,
                        board: cells.map((state) => (state === 'empty' ? '.' : (state ?? '?'))).join(''),
                        disabled: nodes.map((node) => node?.disabled ?? null),
                        winningLine: nodes.flatMap((node, index) =>
                            node?.classList.contains('is-win') ? [index] : [],
                        ),
                        status: document.querySelector(statusSelector)?.getAttribute('data-status') ?? null,
                        hintDisabled: document.querySelector(hintSelector)?.disabled ?? null,
                    };
                };

                const before = read();
                targets.forEach((index) => nodes[index]?.click());
                return { before, after: read() };
            },
            CELL_SELECTORS,
            locators.element('status'),
            locators.element('Hint button'),
            clickTargets,
        );
    }

    async snapshot() {
        return (await this.#observe([])).before;
    }

    async probeWhileLocked(indices) {
        return this.#observe(indices);
    }

    async boardAsString() {
        return (await this.snapshot()).board;
    }

    async statusKey() {
        return this.status.getAttribute('data-status');
    }

    async winningLine() {
        return (await this.snapshot()).winningLine;
    }


    async waitForComputerMove() {
        await browser.waitUntil(async () => SETTLED_STATUSES.includes(await this.statusKey()), {
            timeout: computerReplyTimeout,
            timeoutMsg: 'The computer never finished its move',
        });
    }

    async waitForStatus(expected) {
        await browser.waitUntil(async () => (await this.statusKey()) === expected, {
            timeout: computerReplyTimeout,
            timeoutMsg: `Expected the board status to become "${expected}"`,
        });
    }

    async clickCell(index) {
        await this.cell(index).click();
    }

    async clickWhenReady(index) {
        const cell = this.cell(index);
        await cell.waitForClickable({ timeoutMsg: `Cell ${index} never became clickable` });
        await cell.click();
    }

    async play(index) {
        await this.clickCell(index);
        await this.waitForComputerMove();
    }

    async playMoves(moves) {
        for (const move of moves) {
            const status = await this.statusKey();
            if (status !== 'your-turn') {
                throw new Error(
                    `Cannot play cell ${move} of [${moves}]: the game was already over ` +
                        `(status "${status}"). The opponent did not play the scripted game.`,
                );
            }
            await this.play(move);
        }
    }
}

export const gamePage = new GamePage();
