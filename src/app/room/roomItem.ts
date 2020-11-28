import Item from './item';

import {
    Directions,
    Items
} from '../../utils/dictionary';
import Point from '../../utils/point';
import Dimensions from '../../utils/dimensions';
import Sprite from '../sprite';

export default class RoomItem {
    top: Item;
    left: Item;
    right: Item;
    bottom: Item;
    floor: Item;
    center: Item;

    constructor() {
        this.top = new Item();
        this.left = new Item();
        this.right = new Item();
        this.bottom = new Item();
        this.center = new Item();
        this.floor = new Item();
    }

    set(value: Items, direction: Directions, hard: Boolean = false): Item {
        const item = this.get(direction);
        if (!hard && !item.isEmpty()) {
            return item;
        }

        return item.set(value);
    }

    get(direction: Directions) {
        let item: Item;

        switch (direction) {
        case Directions.Default:
        case Directions.Up:
            item = this.top;
            break;
        case Directions.Down:
            item = this.bottom;
            break;
        case Directions.Left:
            item = this.left;
            break;
        case Directions.Right:
            item = this.right;
            break;
        case Directions.Center:
            item = this.center;
            break;
        case Directions.Floor:
            item = this.floor;
            break;
        default:
            break;
        }

        return item;
    }

    draw(ctx: CanvasRenderingContext2D, origin: Point, dimensions: Dimensions, spriteMap: Map<string, Sprite>) {
        const pairs: Array<[Item, Directions]> = [
            [this.floor, Directions.Up],
            [this.top, Directions.Up],
            [this.bottom, Directions.Down],
            [this.left, Directions.Left],
            [this.right, Directions.Right],
            [this.center, Directions.Center]
        ];
        pairs.reduce((acc, [item, direction]) => {
            item.draw(ctx, origin, dimensions, spriteMap, direction);
            return acc;
        }, 0);
    }
}
