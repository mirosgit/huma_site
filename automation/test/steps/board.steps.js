import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { gamePage } from '../pageobjects/index.js';
import { COMPUTER_MARK, HUMAN_MARK } from '../data/constants.js';
import { parseCellList } from '../utils/board.utils.js';


Given('I have already played the cell {int}', async function (index) {
    await gamePage.play(index);
});

Given('I have played the cells {string}', async function (list) {
    await gamePage.playMoves(parseCellList(list));
});


When('I click the cell {int}', async function (index) {
    await gamePage.clickWhenReady(index);
});

When('I wait for the computer to reply', async function () {
    await gamePage.waitForComputerMove();
});

When('I wait for the board to be ready', async function () {
    await gamePage.waitForStatus('your-turn');
});
When('I click the cell {int} without waiting for the computer', async function (index) {
    await gamePage.clickCell(index);
});

When('I try to click the cell {int}', async function (index) {
    await gamePage.clickCell(index);
});

When('I try to click the cells {string} before the computer replies', async function (list) {
    this.lockedBoard = await gamePage.probeWhileLocked(parseCellList(list));
});


Then('the cell {int} should hold my mark', async function (index) {
    const { cells } = await gamePage.snapshot();
    expect(cells[index]).toBe(HUMAN_MARK);
});

Then('the cell {int} should be disabled', async function (index) {
    const { disabled } = await gamePage.snapshot();
    expect(disabled[index]).toBe(true);
});

Then('all 9 cells should be empty and enabled', async function () {
    const { board, disabled } = await gamePage.snapshot();
    expect({ board, disabled }).toEqual({ board: '.........', disabled: Array(9).fill(false) });
});

Then('all 9 cells should be disabled', async function () {
    const { disabled } = await gamePage.snapshot();
    expect(disabled).toEqual(Array(9).fill(true));
});

Then('the board should look like {string}', async function (expected) {
    expect(await gamePage.boardAsString()).toBe(expected);
});

Then('the board should hold {int} of my mark(s) and {int} computer mark(s)', async function (mine, theirs) {
    const { cells } = await gamePage.snapshot();
    expect({
        mine: cells.filter((cell) => cell === HUMAN_MARK).length,
        theirs: cells.filter((cell) => cell === COMPUTER_MARK).length,
    }).toEqual({ mine, theirs });
});

Then('the computer should have taken exactly one cell', async function () {
    const { cells } = await gamePage.snapshot();
    expect(cells.filter((cell) => cell === COMPUTER_MARK)).toHaveLength(1);
});


Then('the board should have been locked while the computer was thinking', function () {
    const { before } = this.requireLockedBoard();
    expect({
        status: before.status,
        cellsEnabled: before.disabled.filter((isDisabled) => isDisabled === false).length,
        hintDisabled: before.hintDisabled,
    }).toEqual({ status: 'computer-thinking', cellsEnabled: 0, hintDisabled: true });
});

Then('those clicks should have placed no mark', function () {
    const { before, after } = this.requireLockedBoard();
    expect(after.board).toBe(before.board);
});
