import {
    roundDown
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
