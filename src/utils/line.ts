import Point from './point';
import Sprite from '../app/sprite';
import Dimensions from './dimensions';

import {
    AXIS,
    Directions
} from './dictionary';

export default class Line {
    point1: Point;
    point2: Point;

    constructor(point1: Point, point2: Point) {
        this.point1 = point1;
        this.point2 = point2;
    }

    rescale(scale: number): Line {
        return new Line(
            this.point1.rescale(scale),
            this.point2.rescale(scale)
        );
    }

    get axis(): string {
        if (this.point1.x === this.point2.x) {
            return AXIS.VERTICAL;
        }
        if (this.point1.y === this.point2.y) {
            return AXIS.HORIZONTAL;
        }
        return AXIS.UNDEFINED;
    }

    get width(): number {
        return Math.abs(this.point1.x - this.point2.x);
    }

    get height(): number {
        return Math.abs(this.point1.y - this.point2.y);
    }

    contains(line: Line): boolean {
        return (this.hasPoint(line.point1)
            && this.hasPoint(line.point2)
            && line.point1.isBetween(this.point1, this.point2)
            && line.point2.isBetween(this.point1, this.point2)
        );
    }

    hasPoint(point: Point): boolean {
        const paramY = this.point2.x - this.point1.x;
        const paramX = this.point2.y - this.point1.y;

        return ((point.y - this.point1.y) * paramY) - (paramX * (point.x - this.point1.x)) === 0;
    }

    draw(ctx: CanvasRenderingContext2D, sprite: Sprite, scale: number = 16): void {
        sprite
            .draw(
                ctx,
                this.point1,
                new Dimensions(this.width || this.height, this.width || this.height),
                this.axis === AXIS.HORIZONTAL ? Directions.Up : Directions.Left
            )
            .draw(
                ctx,
                this.axis === AXIS.HORIZONTAL ? this.point1.move(0, -scale) : this.point1.move(-scale, 0),
                new Dimensions(this.width || this.height, this.width || this.height),
                this.axis === AXIS.HORIZONTAL ? Directions.Down : Directions.Right
            );
    }
}
