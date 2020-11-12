import Point from '../utils/point';
import Dimensions from '../utils/dimensions';

import { anyFunction } from '../types/functions';
import { Directions } from '../utils/dictionary';
import { degreeToRadians } from '../utils/calculate';

export default class Sprite {
    static image: HTMLImageElement = new Image();
    anchor: Point;
    size: Dimensions;

    constructor(anchor: Point, size: Dimensions) {
        this.anchor = anchor;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D, spot: Point, dimensions: Dimensions, direction?: Directions) {
        let angle;
        switch (direction) {
        case Directions.Down:
            angle = degreeToRadians(180);
            break;
        case Directions.Left:
            angle = degreeToRadians(270);
            break;
        case Directions.Right:
            angle = degreeToRadians(90);
            break;
        case Directions.Up:
        default:
            angle = degreeToRadians(0);
            break;
        }
        if (angle === 0) {
            ctx.drawImage(
                Sprite.image,
                this.anchor.x,
                this.anchor.y,
                this.size.width,
                this.size.height,
                spot.x,
                spot.y,
                dimensions.width,
                dimensions.height
            );
        } else {
            ctx.translate(
                spot.x + (dimensions.width / 2),
                spot.y + (dimensions.height / 2)
            );
            ctx.rotate(angle);
            ctx.drawImage(
                Sprite.image,
                this.anchor.x,
                this.anchor.y,
                this.size.width,
                this.size.height,
                -dimensions.width / 2,
                -dimensions.height / 2,
                dimensions.width,
                dimensions.height
            );
            ctx.rotate(-angle);
            ctx.translate(
                -(spot.x + (dimensions.width / 2)),
                -(spot.y + (dimensions.height / 2))
            );
        }
    }

    static initialize(tileMap: string, callBack: anyFunction) {
        this.image.addEventListener('load', callBack);
        this.image.src = tileMap;
    }
}
