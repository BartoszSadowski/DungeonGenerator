import { Directions } from './dictionary';

export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rescale(scale: number) {
        return new Point(this.x * scale, this.y * scale);
    }

    move(x: number, y: number) {
        return new Point(this.x + x, this.y + y);
    }

    isBetween(point1: Point, point2: Point): boolean {
        const bigX = Math.max(point1.x, point2.x);
        const smallX = Math.min(point1.x, point2.x);
        const bigY = Math.max(point1.y, point2.y);
        const smallY = Math.min(point1.y, point2.y);

        return this.x <= bigX && this.x >= smallX && this.y <= bigY && this.y >= smallY;
    }

    isSame(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    getDirection(point: Point): Directions {
        return ([
            [this.isSame(point), Directions.Center],
            [this.x > point.x, Directions.Left],
            [this.x < point.x, Directions.Right],
            [this.y > point.y, Directions.Up],
            [this.y < point.y, Directions.Down],
            [true, Directions.Default]
        ] as Array<[boolean, Directions]>)
            .find(con => con[0])[1];
    }
}
