import {
    Directions,
    Items,
    Modifiers,
    SPRITE_TYPES
} from '../../utils/dictionary';
import Dimensions from '../../utils/dimensions';
import Point from '../../utils/point';
import Sprite from '../sprite';

export default class Item {
    item: Items;
    modifiers: Array<Modifiers>;

    constructor() {
        this.item = Items.Empty;
        this.modifiers = [];
    }

    isEmpty(): Boolean {
        return this.item === Items.Empty;
    }

    set(item: Items, modifiers?: Array<Modifiers>): Item {
        this.item = item;
        this.modifiers = modifiers || this.modifiers;

        return this;
    }

    draw(
        ctx: CanvasRenderingContext2D,
        origin: Point,
        dimensions: Dimensions,
        SpriteMap: Map<string, Sprite>,
        direction: Directions
    ) {
        let spriteType = '';
        switch (this.item) {
        case Items.Floor:
            spriteType = SPRITE_TYPES.BASE;
            break;
        case Items.Wall:
            spriteType = SPRITE_TYPES.WALL;
            break;
        case Items.Door:
            spriteType = SPRITE_TYPES.DOOR;
            break;
        default:
            break;
        }
        if (spriteType === '') {
            return;
        }
        SpriteMap
            .get(spriteType)
            .draw(
                ctx,
                origin,
                dimensions,
                direction
            );
    }
}
