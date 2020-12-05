import Room from './app/room/room';
import Config from './app/config';
import Sprite from './app/sprite';
import createSpriteMap from './app/spriteMap';
import Dimensions from './utils/dimensions';
import Point from './utils/point';
import {
    calculateCanvas,
    calculateDungeonPoint
} from './utils/canvas';
import dungeonNames from './data/dungeonNames.json';
import {
    getRandomValue
} from './utils/random';

const TILE_MAP_PATH = '../imgs/rockyTileSet.png';

const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

const nameEl = <HTMLElement> document.getElementById('dungeon-name');

const SCALE = 35;
const CANVAS_DIMENSIONS = <Dimensions> calculateCanvas(canvas.clientWidth, canvas.clientHeight, SCALE);
const DUNGEON_POINT = <Point> calculateDungeonPoint(CANVAS_DIMENSIONS, SCALE);

function canvasInit(canvasDimensions: Dimensions) {
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
}

class Dungeon extends Room {
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

    create() {
        this.divide();
        this.connect();
        this.plan();
        this.draw();

        this.generateName();
        this.presentName();
    }
}

(function init(options) {
    Sprite.initialize(TILE_MAP_PATH, () => {
        const {
            divisable,
            minDimension,
            scale,
            dungeonPoint,
            canvasDimensions,
            context,
            spriteMap
        } = options;

        canvasInit(canvasDimensions);

        const config = new Config(divisable, minDimension, scale, context, spriteMap);

        const dungeon = new Dungeon(dungeonPoint, config, nameEl);

        dungeon.create();
        console.log(dungeon);
    });
})({
    divisable: new Dimensions(16, 12),
    minDimension: new Dimensions(5, 5),
    context: ctx,
    dungeonPoint: DUNGEON_POINT,
    canvasDimensions: CANVAS_DIMENSIONS,
    scale: SCALE,
    spriteMap: createSpriteMap()
});
