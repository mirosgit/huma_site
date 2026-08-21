import { Then, When } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { gamePage } from '../pageobjects/index.js';
import { COMPUTER_MARK, STATUS_BY_OUTCOME } from '../data/constants.js';
import { movesForGame } from '../data/game-scenarios.js';
import { parseCellList } from '../utils/board.utils.js';


When('I play the scripted game {string}', async function (name) {
    await gamePage.playMoves(movesForGame(name));
});

Then('the game should be {word}', async function (outcome) {
    const expected = STATUS_BY_OUTCOME[outcome];
    expect(expected).toBeDefined();
    expect(await gamePage.statusKey()).toBe(expected);
});

Then('the game should still be in progress', async function () {
    expect(await gamePage.statusKey()).toBe('your-turn');
});

Then('the winning line should be cells {string}', async function (list) {
    expect(await gamePage.winningLine()).toEqual(parseCellList(list));
});

Then('there should be no winning line', async function () {
    expect(await gamePage.winningLine()).toEqual([]);
});

Then('the computer should have blocked the cell {int}', async function (index) {
    const { cells, status } = await gamePage.snapshot();
    expect(cells[index]).toBe(COMPUTER_MARK);
    expect(status).not.toBe('human');
});
