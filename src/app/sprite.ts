import Point from '../utils/point';

import { anyFunction } from '../types/functions';

export default class Sprite {
    static image: HTMLImageElement = new Image();
    point: Point;

    static initialize(tileMap: string, callBack: anyFunction) {
        this.image.addEventListener('load', callBack);
        this.image.src = tileMap;
    }
}
