import {
    roundDown,
    degreeToRadians
} from '../../utils/calculate';

describe('roundDown() - rounds down to selected value', () => {
    it('should return same value if it is divisible by rounder', () => {
        const [number, rounder] = [16, 2];
        expect(roundDown(number, rounder)).toEqual(number);
    });

    it('should round down if value is not divisible by rounder', () => {
        const [number, rounder, result] = [16, 5, 15];
        expect(roundDown(number, rounder)).toEqual(result);
    });

    it('should round down to 10s if no second argument provided', () => {
        const [number, result] = [16, 10];
        expect(roundDown(number)).toEqual(result);
    });
});

describe('degreeToRadians() - converts angle from 0-360 scale to 0-2pi scale', () => {
    it('should return 0 if given 0', () => {
        const [degree, radian] = [0, 0];
        expect(degreeToRadians(degree)).toEqual(radian);
    });

    it('should return 2pi if given 360', () => {
        const [degree, radian] = [360, 2 * Math.PI];
        expect(degreeToRadians(degree)).toEqual(radian);
    });
});
