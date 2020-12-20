import { EventTypes } from '../../utils/dictionary';

export default class DungeonEvent {
    variant: number;
    type: EventTypes = EventTypes.Default;

    // for enemy type
    strength?: number;
    health?: number;
    species?: string;
    adjective?: string;
    action?: string;
    where?: string;

    // for item type
    noun?: string;
    modifier?: number;
    value?: number;

    // for generic type
    desc?: string;

    constructor(variant: number) {
        this.variant = variant;
    }

    get name(): string {
        return `${this.variant}`;
    }
}
