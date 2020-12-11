import Room from './room';
import Point from '../../utils/point';
import Config from '../config';
import dungeonNames from '../../data/dungeonNames.json';
import {
    getRandomValue
} from '../../utils/random';
import {
    RoomType,
    AXIS,
    StorageItems
} from '../../utils/dictionary';

export default class Dungeon extends Room {
    name: string;
    nameDOMEl: HTMLElement;
    constructor(dungeonPoint: Point, config: Config, nameDOMEl: HTMLElement) {
        super(
            new Point(0, 0),
            dungeonPoint,
            config
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

    setEnteranceExit() {
        const enteranceHorizontal = getRandomValue(0, 1);
        const enteranceVertical = getRandomValue(0, 1);
        const exitHorizontal = Math.abs(enteranceHorizontal - 1);
        const exitVertical = Math.abs(enteranceVertical - 1);

        let roomEnterance: Room = this;
        let roomExit: Room = this;

        while (roomEnterance.childRooms.length > 0) {
            if (roomEnterance.divisionLine.axis === AXIS.HORIZONTAL) {
                roomEnterance = roomEnterance.childRooms[enteranceHorizontal];
            } else {
                roomEnterance = roomEnterance.childRooms[enteranceVertical];
            }
        }
        while (roomExit.childRooms.length > 0) {
            if (roomExit.divisionLine.axis === AXIS.HORIZONTAL) {
                roomExit = roomExit.childRooms[exitHorizontal];
            } else {
                roomExit = roomExit.childRooms[exitVertical];
            }
        }

        roomEnterance.setType(RoomType.Entrance);
        roomExit.setType(RoomType.Exit);
    }

    save() {
        sessionStorage.setItem(StorageItems.Dungeon, JSON.stringify(this));
    }

    create() {
        this.divide();
        this.connect();

        this.setEnteranceExit();

        this.plan();
        this.draw();

        this.generateName();
        this.presentName();

        this.save();
    }

    load() {
        const savedDungeonStr: string = sessionStorage.getItem(StorageItems.Dungeon);
        const savedDungeon: Dungeon = JSON.parse(savedDungeonStr);

        if (this.point2.isSame(savedDungeon.point2)) {
            this.loadChildren(savedDungeon);
            this.draw();

            this.name = savedDungeon.name;
            this.presentName();
        } else {
            this.create();
        }
    }

    init() {
        if (!sessionStorage.getItem(StorageItems.Dungeon)) {
            this.create();
        } else {
            this.load();
        }
    }

    regenerate() {
        console.log('Trying to generate again');
    }
}
