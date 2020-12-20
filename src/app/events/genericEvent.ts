import { EventTypes } from '../../utils/dictionary';
import DungeonEvent from './dungeonEvent';
import GenericValues from '../../data/genericValues.json';
import { getRandomValue } from '../../utils/random';

export default class GenericEvent extends DungeonEvent {
    type: EventTypes = EventTypes.Default;
    desc: string;
    nameProp: string;

    constructor(variant: number) {
        super(variant);

        this.setEvent();
    }

    get name(): string {
        return `${this.nameProp}`;
    }

    get description(): string {
        return `${this.desc}`;
    }

    private setEvent() {
        const { events } = GenericValues;
        const eventIdx = getRandomValue(0, events.length - 1);

        this.desc = events[eventIdx].description;
        this.nameProp = events[eventIdx].name;
    }
}
