import Point from '../utils/point';
import Dimensions from '../utils/dimensions';

import { anyFunction } from '../types/functions';

export default class Sprite {
    static image: HTMLImageElement = new Image();
    anchor: Point;
    size: Dimensions;

    constructor(anchor: Point, size: Dimensions) {
        this.anchor = anchor;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D, spot: Point, dimensions: Dimensions) {
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
    }

    static initialize(tileMap: string, callBack: anyFunction) {
        this.image.addEventListener('load', callBack);
        this.image.src = tileMap;
    }
}
