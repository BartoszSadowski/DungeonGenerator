import { EventTypes } from '../../utils/dictionary';

export default class DungeonEvent {
    variant: number;
    name: string;
    type: EventTypes = EventTypes.Default;

    constructor(variant: number) {
        this.variant = variant;
    }
}
