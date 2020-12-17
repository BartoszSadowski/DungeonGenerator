import { EventTypes } from '../../utils/dictionary';
import { getRandomValue } from '../../utils/random';
import DungeonEvent from './dungeonEvent';

export default class EnemyEvent extends DungeonEvent {
    strength: number;
    health: number;
    type: EventTypes = EventTypes.Enemy;

    constructor(variant: number) {
        super(variant);

        this.strength = getRandomValue(10, 30);
        this.health = getRandomValue(10, 30);
    }
}
