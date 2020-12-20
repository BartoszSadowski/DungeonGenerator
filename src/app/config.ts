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
    denseness: number
    lootChance: number;
    dangerChance: number;

    // messages
    SAVED: string = 'Config saved';
    LOADED: string = 'Config loaded';

    constructor(
        divisable: Dimensions,
        minDimension: Dimensions,
        scale: number,
        context: CanvasRenderingContext2D,
        spriteMap: Map<string, Sprite>,
        denseness: number,
        lootChance: number,
        dangerChance: number
    ) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
        this.ctx = context;
        this.spriteMap = spriteMap;
        this.denseness = denseness;
        this.lootChance = lootChance;
        this.dangerChance = dangerChance;
    }

    save() {
        sessionStorage.setItem(StorageItems.Config, JSON.stringify(this));

        return this.SAVED;
    }

    load() {
        const savedConfigStr: string = sessionStorage.getItem(StorageItems.Config);
        const savedConfig: Config = JSON.parse(savedConfigStr);

        this.scale = savedConfig.scale;
        this.denseness = savedConfig.denseness;
        this.divisable = new Dimensions(savedConfig.divisable.width, savedConfig.divisable.height);
        this.minDimension = new Dimensions(savedConfig.minDimension.width, savedConfig.minDimension.height);
        this.lootChance = savedConfig.lootChance;
        this.dangerChance = savedConfig.dangerChance;

        return this.LOADED;
    }

    init() {
        if (!sessionStorage.getItem(StorageItems.Config)) {
            return this.save();
        }
        return this.load();
    }
}
