import Dimensions from '../utils/dimensions';
import Point from '../utils/point';
import createSpriteMap from '../app/spriteMap';
import {
    calculateCanvas,
    calculateDungeonPoint
} from '../utils/canvas';

export const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
export const ctx = <CanvasRenderingContext2D | null> (canvas ? canvas.getContext('2d') : null);
export const nameEl = <HTMLElement> document.getElementById('dungeon-name');
export const regenerateEl = <HTMLElement> document.getElementById('dungeon-regenerate');
export const bodyEl = <HTMLElement> document.querySelector('body');

export const SCALE = 35;

export const spriteMap = createSpriteMap();
export const divisable = new Dimensions(16, 12);
export const minDimension = new Dimensions(5, 5);

// eslint-disable-next-line import/no-mutable-exports
let CANVAS_DIMENSIONS: Dimensions;
if (canvas) {
    CANVAS_DIMENSIONS = <Dimensions> calculateCanvas(canvas.clientWidth, canvas.clientHeight, SCALE);
} else {
    CANVAS_DIMENSIONS = new Dimensions(0, 0);
}
const DUNGEON_POINT = <Point> calculateDungeonPoint(CANVAS_DIMENSIONS, SCALE);
export {
    CANVAS_DIMENSIONS,
    DUNGEON_POINT
};
