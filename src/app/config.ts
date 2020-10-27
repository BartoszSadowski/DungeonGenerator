import Dimensions from '../utils/dimensions';

type anyFunction = () => any;

export default class Config {
    divisable: Dimensions;
    minDimension: Dimensions;
    scale: number;
    ctx: CanvasRenderingContext2D;
    spriteMap: HTMLImageElement;

    constructor(divisable: Dimensions, minDimension: Dimensions, scale: number, context: CanvasRenderingContext2D) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
        this.ctx = context;
        this.spriteMap = new Image();
    }

    loadSpriteMap(path: string, callback: anyFunction) {
        this.spriteMap.onload = callback;
        this.spriteMap.src = path;
    }
}
