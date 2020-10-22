// eslint-disable-next-line import/prefer-default-export
export function roundDown(number: number, rounder = 10): number {
    return Math.floor(number / rounder) * rounder;
}
