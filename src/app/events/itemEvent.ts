import { EventTypes } from '../../utils/dictionary';
import DungeonEvent from './dungeonEvent';
import ItemValues from '../../data/itemValues.json';
import { getRandomValue } from '../../utils/random';

export default class ItemEvent extends DungeonEvent {
    type: EventTypes = EventTypes.Item;
    adjective: string;
    noun: string;
    action: string;
    where: string;
    modifier: number;

    constructor(variant: number) {
        super(variant);

        this.modifier = getRandomValue(1, 3);
        this.setAdjective();
        this.setNoun();
        this.setAction();
        this.setWhere();
    }

    get name(): string {
        return `${this.adjective} ${this.noun}`;
    }

    get description(): string {
        return `
            ${this.name} ${this.action} ${this.where}
        `;
    }

    private setAdjective() {
        const { adjectives } = ItemValues;
        this.adjective = adjectives[getRandomValue(0, adjectives.length - 1)];
    }

    private setNoun() {
        const { nouns } = ItemValues;
        this.noun = nouns[getRandomValue(0, nouns.length - 1)];
    }

    private setAction() {
        const { actions } = ItemValues;
        this.action = actions[getRandomValue(0, actions.length - 1)];
    }

    private setWhere() {
        const { places } = ItemValues;
        this.where = places[getRandomValue(0, places.length - 1)];
    }
}
