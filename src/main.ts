import Room from './app/room';
import Config from './app/config';
import Dimensions from './app/dimensions';
import Point from './app/point';
import {
    calculateCanvas,
    calculateDungeonPoint
} from './utils/canvas';

const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

const SCALE = 35;
const CANVAS_DIMENSIONS = <Dimensions> calculateCanvas(canvas.clientWidth, canvas.clientHeight, SCALE);
const DUNGEON_POINT = <Point> calculateDungeonPoint(CANVAS_DIMENSIONS, SCALE);

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
        this.draw(ctx);
    }
}

(function init(options) {
    const {
        divisable,
        minDimension,
        scale,
        dungeonPoint,
        canvasDimensions,
        context
    } = options;

    canvasInit(canvasDimensions);

    const config = new Config(divisable, minDimension, scale, context);

    const dungeon = new Dungeon(dungeonPoint, config);

    dungeon.create();
    console.log(dungeon);
})({
    divisable: new Dimensions(20, 20),
    minDimension: new Dimensions(4, 4),
    context: ctx,
    dungeonPoint: DUNGEON_POINT,
    canvasDimensions: CANVAS_DIMENSIONS,
    scale: SCALE
});
