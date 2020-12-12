import Dungeon from './app/room/dungeon';
import Config from './app/config';
import Sprite from './app/sprite';
import Dimensions from './utils/dimensions';
import {
    canvas,
    ctx,
    nameEl,
    regenerateEl,
    bodyEl,
    SCALE,
    CANVAS_DIMENSIONS,
    DUNGEON_POINT,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';

const TILE_MAP_PATH = '../imgs/rockyTileSet.png';

function canvasInit(canvasDimensions: Dimensions) {
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
}

Sprite.initialize(TILE_MAP_PATH, () => {
    canvasInit(CANVAS_DIMENSIONS);

    const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap);

    const dungeon = new Dungeon(DUNGEON_POINT, config, nameEl);
    dungeon.init();

    regenerateEl.addEventListener('click', () => {
        dungeon.regenerate();
    });
    bodyEl.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.key === 'r') {
            dungeon.regenerate();
        }
    });

    console.log(dungeon);
});
