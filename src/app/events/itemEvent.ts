import { EventTypes } from '../../utils/dictionary';
import DungeonEvent from './dungeonEvent';

export default class ItemEvent extends DungeonEvent {
    type: EventTypes = EventTypes.Item;

    get name(): string {
        return `${this.variant} ${this.type}`;
    }
}
