export function roundDown(number: number, rounder = 10): number {
    return Math.floor(number / rounder) * rounder;
}

export function degreeToRadians(degree: number): number {
    return (degree * Math.PI) / 180;
}
