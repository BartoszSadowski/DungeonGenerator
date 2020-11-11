import Point from './point';
import Sprite from '../app/sprite';
import Dimensions from './dimensions';

import { AXIS } from './dictionary';

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

    draw(ctx: CanvasRenderingContext2D, sprite?: Sprite): void {
        if (sprite) {
            sprite.draw(ctx, this.point1, new Dimensions(this.width || this.height, this.width || this.height));
        } else {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.point1.x, this.point1.y);
            ctx.lineTo(this.point2.x, this.point2.y);
            ctx.stroke();
        }
    }
}
