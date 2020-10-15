import Point from './point';

import { AXIS } from '../utils/dictionary';

export default class Line {
    point1: Point;
    point2: Point;

    constructor(point1: Point, point2: Point) {
        this.point1 = point1;
        this.point2 = point2;
    }

    rescale(scale: number) {
        return new Line(
            this.point1.rescale(scale),
            this.point2.rescale(scale)
        );
    }

    get axis() {
        if (this.point1.x === this.point2.x) {
            return AXIS.VERTICAL;
        } else if (this.point1.y === this.point2.y) {
            return AXIS.HORIZONTAL;
        } else {
            return AXIS.UNDEFINED;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
    }
}
