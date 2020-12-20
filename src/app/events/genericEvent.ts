import { EventTypes } from '../../utils/dictionary';
import DungeonEvent from './dungeonEvent';

export default class GenericEvent extends DungeonEvent {
    type: EventTypes = EventTypes.Default;
    desc: string;

    constructor(variant: number) {
        super(variant);

        this.setDescription();
    }

    get name(): string {
        return `${this.type}`;
    }

    get description(): string {
        return `${this.desc}`;
    }

    private setDescription() {
        this.desc = '';
    }
}
