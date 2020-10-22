import Dimensions from '../../app/dimensions';
import {
    calculateCanvas, calculateDungeonPoint
} from '../../utils/canvas';

describe('calculateCanvas() - function calculating dimensions for canvas to draw dungeon', () => {
    it('should give padding of at least 2% of screen size', () => {
        const [width, height, scale] = [100, 100, 1];
        const value = new Dimensions(98, 98);

        const result = calculateCanvas(width, height, scale);

        expect(result.width).toEqual(value.width);
        expect(result.height).toEqual(value.height);
    });

    it('should give height and width divisible by scale', () => {
        const [width, height, scale] = [100, 100, 9];
        const value = new Dimensions(90, 90);

        const result = calculateCanvas(width, height, scale);

        expect(result.width).toEqual(value.width);
        expect(result.height).toEqual(value.height);
    });
});

describe('calculateDungeonPoint() - function calculating size of dungeon based on scale', () => {
    it('should give width and height scaled down by scale factor', () => {
        const dimensions = new Dimensions(100, 100);
        const scale = 5;
        const value = {
            x: 20,
            y: 20
        };

        const result = calculateDungeonPoint(dimensions, scale);

        expect(result.x).toEqual(value.x);
        expect(result.y).toEqual(value.y);
    });
});
