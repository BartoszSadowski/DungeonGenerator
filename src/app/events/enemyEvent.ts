import { EventTypes } from '../../utils/dictionary';
import { getRandomValue } from '../../utils/random';
import DungeonEvent from './dungeonEvent';

export default class EnemyEvent extends DungeonEvent {
    strength: number;
    health: number;
    type: EventTypes = EventTypes.Enemy;

    constructor(variant: number, strength?: number, health?: number) {
        super(variant);

        this.strength = strength || getRandomValue(10, 30);
        this.health = health || getRandomValue(10, 30);
    }
}
