import Point from '../../app/point';

describe('rescale() - function returning new Point with scaled dimensions', () => {
    it('should return bigger point if given scale higher than 1', () => {
        const [x, y] = [2, 4];
        const scale = 2;
        const [resultX, resultY] = [4, 8];

        const point = new Point(x, y);
        const scaledPoint = point.rescale(scale);

        expect(scaledPoint.x).toBe(resultX);
        expect(scaledPoint.y).toBe(resultY);
    });

    it('should return smaller point if given scale between 1 and 0', () => {
        const [x, y] = [2, 4];
        const scale = 0.5;
        const [resultX, resultY] = [1, 2];

        const point = new Point(x, y);
        const scaledPoint = point.rescale(scale);

        expect(scaledPoint.x).toBe(resultX);
        expect(scaledPoint.y).toBe(resultY);
    });

    it('should return equal same point if given scale equal to 1', () => {
        const [x, y] = [2, 4];
        const scale = 1;
        const [resultX, resultY] = [2, 4];

        const point = new Point(x, y);
        const scaledPoint = point.rescale(scale);

        expect(scaledPoint.x).toBe(resultX);
        expect(scaledPoint.y).toBe(resultY);
    });
});
