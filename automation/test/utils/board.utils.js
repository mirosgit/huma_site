export function parseCellList(list) {
    return list
        .split(',')
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));
}
