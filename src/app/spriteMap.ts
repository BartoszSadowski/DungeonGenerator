import Dimensions from '../utils/dimensions';
import Sprite from './sprite';
import {
    SPRITE_TYPES
} from '../utils/dictionary';
import SPRITE_LOCATIONS from '../utils/spriteLocations';

const spriteDimensions = new Dimensions(16, 16);

function appendSprite(map: Map<string, Sprite>, name: string): void {
    map.set(name, new Sprite(SPRITE_LOCATIONS[name], spriteDimensions));
}

export default function createSpriteMap() {
    const spriteMap: Map<string, Sprite> = new Map();

    Object
        .keys(SPRITE_TYPES)
        .forEach(key => {
            appendSprite(spriteMap, SPRITE_TYPES[key]);
        });

    return spriteMap;
}
