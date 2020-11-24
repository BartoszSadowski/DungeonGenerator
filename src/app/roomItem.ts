import Item from './item';

import {
    Directions,
    Items
} from '../utils/dictionary';

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
}
