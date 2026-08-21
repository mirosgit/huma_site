
const SCRIPTED_GAMES = {
    'player wins': [0, 3, 6],
    'computer wins': [3, 5, 7],
    draw: [1, 3, 4, 6, 8],
};

export const movesForGame = (name) => {
    const moves = SCRIPTED_GAMES[name];
    if (!moves) {
        throw new Error(`Unknown scripted game "${name}". Known: ${Object.keys(SCRIPTED_GAMES).join(', ')}`);
    }
    return moves;
};
