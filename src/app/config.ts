import Dimensions from '../utils/dimensions';
import Sprite from './sprite';

export default class Config {
    divisable: Dimensions;
    minDimension: Dimensions;
    scale: number;
    ctx: CanvasRenderingContext2D;
    spriteMap: Map<string, Sprite>

    constructor(
        divisable: Dimensions,
        minDimension: Dimensions,
        scale: number,
        context: CanvasRenderingContext2D,
        spriteMap: Map<string, Sprite>
    ) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
        this.ctx = context;
        this.spriteMap = spriteMap;
    }
}
