export const FIXED = {
    accountCreated: Date.UTC(2024, 0, 15, 10, 30),
    gameFinished: Date.UTC(2024, 0, 20, 12, 0),
};

export function descendingTimestamps(count, from = FIXED.gameFinished) {
    return Array.from({ length: count }, (_, index) => from - index * 60_000);
}
