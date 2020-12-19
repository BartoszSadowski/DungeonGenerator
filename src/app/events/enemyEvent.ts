import { EventTypes } from '../../utils/dictionary';
import { getRandomValue } from '../../utils/random';
import DungeonEvent from './dungeonEvent';
import EnemyValues from '../../data/enemyValues.json';

export default class EnemyEvent extends DungeonEvent {
    strength: number;
    health: number;
    species: string;
    adjective: string;
    action: string;
    where: string;
    type: EventTypes = EventTypes.Enemy;

    constructor(variant: number) {
        super(variant);

        this.strength = getRandomValue(10, 30);
        this.health = getRandomValue(10, 30);
        this.setSpecies();
        this.setAdjective();
        this.setAction();
        this.setWhere();
    }

    get name(): string {
        return `The ${this.adjective} ${this.species}`;
    }

    get description(): string {
        return `
            ${this.name} ${this.action} ${this.where}.
        `;
    }

    private setSpecies() {
        const { specieses } = EnemyValues;
        this.species = specieses[getRandomValue(0, specieses.length - 1)];
    }

    private setAdjective() {
        const { adjectives } = EnemyValues;
        this.adjective = adjectives[getRandomValue(0, adjectives.length - 1)];
    }

    private setAction() {
        const { actions } = EnemyValues;
        this.action = actions[getRandomValue(0, actions.length - 1)];
    }

    private setWhere() {
        const { places } = EnemyValues;
        this.where = places[getRandomValue(0, places.length - 1)];
    }
}
