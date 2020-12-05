import Room from './room';
import Point from '../../utils/point';
import Config from '../config';
import dungeonNames from '../../data/dungeonNames.json';
import {
    getRandomValue
} from '../../utils/random';
import {
    RoomType
} from '../../utils/dictionary';

export default class Dungeon extends Room {
    name: string;
    nameDOMEl: HTMLElement;
    constructor(dungeonPoint: Point, config: Config, nameDOMEl: HTMLElement) {
        super(
            new Point(0, 0),
            dungeonPoint,
            config,
            null
        );
        this.nameDOMEl = nameDOMEl;
        this.type = RoomType.Dungeon;
    }

    generateName() {
        const {
            adjectives,
            locations,
            descriptors
        } = dungeonNames;

        const [adjectiveI, locationI, descriptorI] = [
            getRandomValue(0, adjectives.length),
            getRandomValue(0, locations.length),
            getRandomValue(0, descriptors.length)
        ];

        this.name = `The ${adjectives[adjectiveI]} ${locations[locationI]} ${descriptors[descriptorI]}`;
    }

    presentName() {
        this.nameDOMEl.innerText = this.name;
    }

    setRoomType(type: RoomType) {
        let room: Room = this;
        while (room.childRooms.length > 0) {
            room = room.childRooms[getRandomValue(0, 1)];
        }

        try {
            room.setType(type);
        } catch (error) {
            if (error.message === room.ROOM_TYPE_DEFINED) {
                this.setRoomType(type);
            } else {
                throw error;
            }
        }
    }

    create() {
        this.divide();
        this.connect();

        this.setRoomType(RoomType.Entrance);
        this.setRoomType(RoomType.Exit);

        this.plan();
        this.draw();

        this.generateName();
        this.presentName();
    }
}
