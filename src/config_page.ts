import Config from './app/config';
import {
    ctx,
    SCALE,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';
import Dimensions from './utils/dimensions';

const scaleEl = <HTMLInputElement> document.getElementById('scale');
const bigRoomHeightEl = <HTMLInputElement> document.getElementById('big-room-height');
const bigRoomWidthEl = <HTMLInputElement> document.getElementById('big-room-width');
const smallRoomHeightEl = <HTMLInputElement> document.getElementById('small-room-height');
const smallRoomWidthEl = <HTMLInputElement> document.getElementById('small-room-width');

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap);
config.init();

scaleEl.value = config.scale.toString();
scaleEl.addEventListener('change', () => {
    config.scale = +scaleEl.value;
    config.save();
});

bigRoomHeightEl.value = config.divisable.height.toString();
bigRoomHeightEl.addEventListener('change', () => {
    config.divisable = new Dimensions(config.divisable.width, +bigRoomHeightEl.value);
    config.save();
});

bigRoomWidthEl.value = config.divisable.width.toString();
bigRoomWidthEl.addEventListener('change', () => {
    config.divisable = new Dimensions(+bigRoomWidthEl.value, config.divisable.width);
    config.save();
});

smallRoomHeightEl.value = config.minDimension.height.toString();
smallRoomHeightEl.addEventListener('change', () => {
    config.minDimension = new Dimensions(config.minDimension.width, +smallRoomHeightEl.value);
    config.save();
});

smallRoomWidthEl.value = config.minDimension.width.toString();
smallRoomWidthEl.addEventListener('change', () => {
    config.minDimension = new Dimensions(+smallRoomWidthEl.value, config.minDimension.width);
    config.save();
});
