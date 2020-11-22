import Room from './app/room';
import Config from './app/config';
import Sprite from './app/sprite';
import createSpriteMap from './app/spriteMap';
import Dimensions from './utils/dimensions';
import Point from './utils/point';
import {
    calculateCanvas,
    calculateDungeonPoint
} from './utils/canvas';

const TILE_MAP_PATH = '../imgs/rockyTileSet.png';
const SCALE = 40;
const CANVAS_DIMENSIONS = <Dimensions> calculateCanvas(document.body.clientWidth, document.body.clientHeight, SCALE);
const DUNGEON_POINT = <Point> calculateDungeonPoint(CANVAS_DIMENSIONS, SCALE);

const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

function canvasInit(canvasDimensions: Dimensions) {
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
}

class Dungeon extends Room {
    constructor(dungeonPoint: Point, config: Config) {
        super(
            new Point(0, 0),
            dungeonPoint,
            config,
            null
        );
    }

    create() {
        this.divide();
        this.connect();
        this.plan();
        this.draw();
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

        const dungeon = new Dungeon(dungeonPoint, config);

        dungeon.create();
        console.log(dungeon);
    });
})({
    divisable: new Dimensions(16, 12),
    minDimension: new Dimensions(4, 4),
    context: ctx,
    dungeonPoint: DUNGEON_POINT,
    canvasDimensions: CANVAS_DIMENSIONS,
    scale: SCALE,
    spriteMap: createSpriteMap()
});
