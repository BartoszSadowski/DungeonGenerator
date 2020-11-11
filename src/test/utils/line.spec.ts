import Line from '../../utils/line';
import Point from '../../utils/point';
import { AXIS } from '../../utils/dictionary';

describe('rescale() - function returning new Line with scaled points', () => {
    it('should return bigger points if given scale higher than 1', () => {
        const point1 = new Point(1, 2);
        const point2 = new Point(3, 4);
        const scale = 2;
        const line = new Line(point1, point2);

        const scaledLine = line.rescale(scale);

        expect(scaledLine.point1.x).toBe(point1.x * scale);
        expect(scaledLine.point1.y).toBe(point1.y * scale);
        expect(scaledLine.point2.x).toBe(point2.x * scale);
        expect(scaledLine.point2.y).toBe(point2.y * scale);
    });

    it('should return smaller points if given scale is between 0 and 1', () => {
        const point1 = new Point(2, 4);
        const point2 = new Point(6, 8);
        const scale = 0.5;
        const line = new Line(point1, point2);

        const scaledLine = line.rescale(scale);

        expect(scaledLine.point1.x).toBe(point1.x * scale);
        expect(scaledLine.point1.y).toBe(point1.y * scale);
        expect(scaledLine.point2.x).toBe(point2.x * scale);
        expect(scaledLine.point2.y).toBe(point2.y * scale);
    });

    it('should return same points if given scale equal to 1', () => {
        const point1 = new Point(1, 2);
        const point2 = new Point(3, 4);
        const scale = 1;
        const line = new Line(point1, point2);

        const scaledLine = line.rescale(scale);

        expect(scaledLine.point1.x).toBe(point1.x);
        expect(scaledLine.point1.y).toBe(point1.y);
        expect(scaledLine.point2.x).toBe(point2.x);
        expect(scaledLine.point2.y).toBe(point2.y);
    });
});

describe('get axis() - retrieves axis in which line is layed', () => {
    it('should return VERTICAL if line is layed verticaly', () => {
        const point1 = new Point(2, 5);
        const point2 = new Point(2, 7);
        const line = new Line(point1, point2);

        expect(line.axis).toBe(AXIS.VERTICAL);
    });

    it('should return HORIZONTAL if line is layed horizontaly', () => {
        const point1 = new Point(5, 2);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);

        expect(line.axis).toBe(AXIS.HORIZONTAL);
    });

    it('should return UNDEFINED if line is neither', () => {
        const point1 = new Point(5, 4);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);

        expect(line.axis).toBe(AXIS.UNDEFINED);
    });
});

describe('get width()', () => {
    it('should return correct value', () => {
        const point1 = new Point(5, 4);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);

        expect(line.width).toBe(2);
    });

    it('should always return nonegative value', () => {
        const point1 = new Point(5, 4);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);
        const line2 = new Line(point2, point1);

        expect(line.width).toBe(2);
        expect(line2.width).toBe(2);
    });
});

describe('get height()', () => {
    it('should return correct value', () => {
        const point1 = new Point(5, 4);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);

        expect(line.height).toBe(2);
    });

    it('should always return nonegative value', () => {
        const point1 = new Point(5, 4);
        const point2 = new Point(7, 2);
        const line = new Line(point1, point2);
        const line2 = new Line(point2, point1);

        expect(line.height).toBe(2);
        expect(line2.height).toBe(2);
    });
});
