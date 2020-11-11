import Point from '../utils/point';
import Dimensions from '../utils/dimensions';

import { anyFunction } from '../types/functions';
import { Directions } from '../utils/dictionary';

export default class Sprite {
    static image: HTMLImageElement = new Image();
    anchor: Point;
    size: Dimensions;

    constructor(anchor: Point, size: Dimensions) {
        this.anchor = anchor;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D, spot: Point, dimensions: Dimensions, direction?: Directions) {
        switch (direction) {
        case Directions.Down:
            break;
        case Directions.Left:
            break;
        case Directions.Right:
            break;
        case Directions.Up:
        default:
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
            break;
        }
    }

    static initialize(tileMap: string, callBack: anyFunction) {
        this.image.addEventListener('load', callBack);
        this.image.src = tileMap;
    }
}
