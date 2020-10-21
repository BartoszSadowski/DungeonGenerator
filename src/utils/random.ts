export const getRandomValue = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
export function getRandomColor() {
    const r = getRandomValue(0, 255);
    const g = getRandomValue(0, 255);
    const b = getRandomValue(0, 255);
    return `rgb(${r},${g},${b})`;
}
