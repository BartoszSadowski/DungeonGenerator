export const getRandomValue = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

export const getValueWithTendency = (
    firstChance: number, secondChance: number, firstRes: any, secondRes: any
) => (getRandomValue(1, firstChance + secondChance) > firstChance
    ? secondRes
    : firstRes);

export function getRandomColor() {
    const r = getRandomValue(0, 255);
    const g = getRandomValue(0, 255);
    const b = getRandomValue(0, 255);
    return `rgb(${r},${g},${b})`;
}
