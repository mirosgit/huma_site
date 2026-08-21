import { setWorldConstructor, World } from '@cucumber/cucumber';

class TicTacToeWorld extends World {
    constructor(options) {
        super(options);
        this.currentPlayer = null;
        this.lockedBoard = null;
    }

    requirePlayer() {
        if (!this.currentPlayer) {
            throw new Error('No player in this scenario - a Given step must sign someone in first');
        }
        return this.currentPlayer;
    }

    requireLockedBoard() {
        if (!this.lockedBoard) {
            throw new Error('The locked board was never observed - a When step must probe it first');
        }
        if (this.lockedBoard.before.status !== 'computer-thinking') {
            throw new Error(
                `The computer had already replied before the board could be probed ` +
                    `(status was "${this.lockedBoard.before.status}")`,
            );
        }
        return this.lockedBoard;
    }
}

setWorldConstructor(TicTacToeWorld);
