import {
    Directions,
    Items,
    Modifiers,
    SPRITE_TYPES
} from '../../utils/dictionary';
import Dimensions from '../../utils/dimensions';
import Point from '../../utils/point';
import Sprite from '../sprite';
import { getRandomValue } from '../../utils/random';

export default class Item {
    item: Items;
    modifiers: Record<string, any>;

    constructor() {
        this.item = Items.Empty;
        this.modifiers = {};
    }

    isEmpty(): Boolean {
        return this.item === Items.Empty;
    }

    set(item: Items): Item {
        this.item = item;

        return this;
    }

    setModifier(type: Modifiers, value: any): Item {
        this.modifiers[type] = value;

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
        case Items.Exit:
            spriteType = SPRITE_TYPES.EXIT;
            break;
        case Items.Enterance:
            spriteType = SPRITE_TYPES.ENTERANCE;
            break;
        case Items.Event:
            switch (this.modifiers[Modifiers.Variant]) {
            case 1:
                spriteType = SPRITE_TYPES.EVENT_B;
                break;
            case 2:
                spriteType = SPRITE_TYPES.EVENT_C;
                break;
            case 3:
                spriteType = SPRITE_TYPES.EVENT_D;
                break;
            case 4:
                spriteType = SPRITE_TYPES.EVENT_E;
                break;
            case 0:
            default:
                spriteType = SPRITE_TYPES.EVENT_A;
                break;
            }
            break;
        case Items.Misc:
            switch (this.modifiers[Modifiers.Variant]) {
            case 1:
                spriteType = SPRITE_TYPES.MISC_A;
                break;
            case 2:
                spriteType = SPRITE_TYPES.MISC_B;
                break;
            case 3:
                spriteType = SPRITE_TYPES.MISC_C;
                break;
            case 4:
                spriteType = SPRITE_TYPES.MISC_D;
                break;
            case 5:
                spriteType = SPRITE_TYPES.MISC_E;
                break;
            case 6:
                spriteType = SPRITE_TYPES.MISC_F;
                break;
            default:
                break;
            }
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
