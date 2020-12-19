import { EventTypes } from '../../utils/dictionary';

export default class DungeonEvent {
    variant: number;
    type: EventTypes = EventTypes.Default;

    // for enemy type
    strength?: number;
    health?: number;
    weapon?: string;
    species?: string;
    adjective?: string;
    action?: string;
    where?: string;

    constructor(variant: number) {
        this.variant = variant;
    }

    get name(): string {
        return `${this.variant}`;
    }
}
