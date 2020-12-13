import Dimensions from '../utils/dimensions';
import Sprite from './sprite';
import {
    StorageItems
} from '../utils/dictionary';

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

    save() {
        sessionStorage.setItem(StorageItems.Config, JSON.stringify(this));
    }

    load() {
        const savedConfigStr: string = sessionStorage.getItem(StorageItems.Config);
        const savedConfig: Config = JSON.parse(savedConfigStr);

        this.scale = savedConfig.scale;
        this.divisable = new Dimensions(savedConfig.divisable.width, savedConfig.divisable.height);
        this.minDimension = new Dimensions(savedConfig.minDimension.width, savedConfig.minDimension.height);
    }

    init() {
        if (!sessionStorage.getItem(StorageItems.Config)) {
            this.save();
        } else {
            this.load();
        }
    }
}
