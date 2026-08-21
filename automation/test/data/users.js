import { FIXED, descendingTimestamps } from '../utils/date.utils.js';

export const aGeneratedName = () => `Player${Math.random().toString(36).slice(2, 8)}`;

export const aUser = ({ name, difficulty = 'easy', history = [], createdAt = FIXED.accountCreated }) => ({
    name,
    createdAt,
    difficulty,
    history,
});

const aFinishedGame = ({ result, difficulty, finishedAt }) => ({ finishedAt, difficulty, result });

export const aHistory = (results, difficulty = 'easy') => {
    const timestamps = descendingTimestamps(results.length);
    return results.map((result, index) => aFinishedGame({ result, difficulty, finishedAt: timestamps[index] }));
};
