import Dimensions from '../utils/dimensions';

export default class Config {
    divisable: Dimensions;
    minDimension: Dimensions;
    scale: number;
    ctx: CanvasRenderingContext2D;

    constructor(divisable: Dimensions, minDimension: Dimensions, scale: number, context: CanvasRenderingContext2D) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
        this.ctx = context;
    }
}
