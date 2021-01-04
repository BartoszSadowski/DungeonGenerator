import Dimensions from '../utils/dimensions';
import createSpriteMap from '../app/spriteMap';

export const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
export const ctx = <CanvasRenderingContext2D | null> (canvas ? canvas.getContext('2d') : null);
export const nameEl = <HTMLElement> document.getElementById('dungeon-name');
export const regenerateEl = <HTMLElement> document.getElementById('dungeon-regenerate');
export const printEl = <HTMLElement> document.getElementById('dungeon-print');
export const bodyEl = <HTMLElement> document.querySelector('body');
export const eventEl = <HTMLElement> document.getElementById('event-list');

export const SCALE = 35;
export const DENSENESS = 1;

export const spriteMap = createSpriteMap();
export const divisable = new Dimensions(16, 12);
export const minDimension = new Dimensions(6, 6);

export const lootChance = 50;
export const dangerChance = 50;
export const eventChance = lootChance + dangerChance / 2;
