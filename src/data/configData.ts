import Dimensions from '../utils/dimensions';
import createSpriteMap from '../app/spriteMap';

export const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
export const ctx = <CanvasRenderingContext2D | null> (canvas ? canvas.getContext('2d') : null);
export const nameEl = <HTMLElement> document.getElementById('dungeon-name');
export const regenerateEl = <HTMLElement> document.getElementById('dungeon-regenerate');
export const bodyEl = <HTMLElement> document.querySelector('body');

export const SCALE = 35;

export const spriteMap = createSpriteMap();
export const divisable = new Dimensions(16, 12);
export const minDimension = new Dimensions(5, 5);
