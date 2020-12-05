import Dungeon from './app/room/dungeon';
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
