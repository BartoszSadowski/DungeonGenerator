import Point from '../../utils/point';

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

describe('isBetween(point1, point2)', () => {
    it('should return false if point is right to both points', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(2, 2);
        const point3 = new Point(3, 3);

        expect(point3.isBetween(point1, point2)).toBeFalsy();
    });

    it('should return false if point is left to both points', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(2, 2);
        const point3 = new Point(3, 3);

        expect(point1.isBetween(point2, point3)).toBeFalsy();
    });

    it('should return false if point is up to both points', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(2, 2);
        const point3 = new Point(3, 3);

        expect(point3.isBetween(point1, point2)).toBeFalsy();
    });

    it('should return false if point is down to both points', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(2, 2);
        const point3 = new Point(3, 3);

        expect(point1.isBetween(point2, point3)).toBeFalsy();
    });

    it('should return true if is in the middle between points', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(2, 2);
        const point3 = new Point(3, 3);

        expect(point2.isBetween(point1, point3)).toBeTruthy();
    });
});
