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

    // messages
    LOADED: string = 'Dungeon Loaded';
    CREATED: string = 'Dungeon Created';

    // events
    REQUEST_REGENRATION: string = 'RequestRegenreration'

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

    getLeaves() {
        const children: Room[] = [];

        (function getChildren(room: Room) {
            if (room.childRooms.length > 0) {
                room.childRooms.forEach((child: Room) => getChildren(child));
            } else {
                children.push(room);
            }
        })(this);

        return children;
    }

    setEvents() {
        const emptyChildren = this.getLeaves()
            .filter(({ type }) => type === RoomType.Default)
            .sort(() => getRandomValue(-1, 1));

        const localChance = Math.min(5, emptyChildren.length * this.config.eventChance);

        emptyChildren.slice(0, localChance)
            .forEach((child: Room) => {
                child.setType(RoomType.Event);
            });
    }

    save() {
        sessionStorage.setItem(StorageItems.Dungeon, JSON.stringify(this));
    }

    create() {
        this.divide();
        this.connect();

        this.setEnteranceExit();
        this.setEvents();

        this.plan();
        this.draw();

        this.generateName();
        this.presentName();

        this.save();
        return this.CREATED;
    }

    load() {
        const savedDungeonStr: string = sessionStorage.getItem(StorageItems.Dungeon);
        const savedDungeon: Dungeon = JSON.parse(savedDungeonStr);

        if (this.point2.isSame(savedDungeon.point2)) {
            this.loadChildren(savedDungeon);
            this.draw();

            this.name = savedDungeon.name;
            this.presentName();
            return this.LOADED;
        }
        return this.create();
    }

    init() {
        if (!sessionStorage.getItem(StorageItems.Dungeon)) {
            return this.create();
        }
        return this.load();
    }

    clear() {
        this.config.ctx.clearRect(
            this.origin.x * this.config.scale,
            this.origin.y * this.config.scale,
            this.point2.x * this.config.scale,
            this.point2.y * this.config.scale
        );
        this.childRooms = [];
        this.doors = [];
    }

    regenerate() {
        this.clear();
        window.dispatchEvent(new Event(this.REQUEST_REGENRATION));
    }
}
