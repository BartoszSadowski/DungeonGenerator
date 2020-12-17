import { EventTypes } from '../../utils/dictionary';

export default class DungeonEvent {
    variant: number;
    name: string;
    strength?: number;
    health?: number;
    type: EventTypes = EventTypes.Default;

    constructor(variant: number) {
        this.variant = variant;

        this.generateName();
    }

    generateName() {
        this.name = '';
    }
}
