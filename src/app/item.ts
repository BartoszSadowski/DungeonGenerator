import {
    Items,
    Modifiers
} from '../utils/dictionary';

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
}
