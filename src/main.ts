/// <reference path='./main.d.ts'/>
import 'regenerator-runtime/runtime';

import Dungeon from './app/room/dungeon';
import Config from './app/config';
import Sprite from './app/sprite';
import Dimensions from './utils/dimensions';
import Point from './utils/point';
import {
    generateEvents
} from './utils/manipulateDOM';

import {
    canvas,
    ctx,
    nameEl,
    regenerateEl,
    printEl,
    bodyEl,
    SCALE,
    DENSENESS,
    spriteMap,
    divisable,
    minDimension,
    lootChance,
    dangerChance
} from './data/configData';

import {
    calculateCanvas,
    calculateDungeonPoint
} from './utils/canvas';

import tileMap from './imgs/rockyTileSet.png';

function canvasInit(canvasDimensions: Dimensions) {
    canvas.width = canvasDimensions.width;
    canvas.style.width = `${canvasDimensions.width}px`;
    canvas.height = canvasDimensions.height;
    canvas.style.height = `${canvasDimensions.height}px`;
}

(async () => {
    await Sprite.initialize(tileMap);
    try {
        // Load config
        const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap, DENSENESS, lootChance, dangerChance);
        config.init();

        // Calculate canvas
        const canvasDimensions = <Dimensions> calculateCanvas(canvas.clientWidth, canvas.clientHeight, config.scale);
        const dungeonPoint = <Point> calculateDungeonPoint(canvasDimensions, config.scale);

        canvasInit(canvasDimensions);

        // Load dungeon
        const dungeon = new Dungeon(dungeonPoint, config, nameEl);
        dungeon.init();
        generateEvents(dungeon.events);

        // Set listeners
        regenerateEl.addEventListener('click', () => {
            dungeon.regenerate();
        });

        bodyEl.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key === 'r') {
                dungeon.regenerate();
            }
        });

        window.addEventListener(dungeon.REQUEST_REGENRATION, () => {
            window.location.reload();
            dungeon.create();
        });

        printEl.addEventListener('click', () => {
            window.print();
        });
    } catch (error) {
        console.log(error);
    }
})();
