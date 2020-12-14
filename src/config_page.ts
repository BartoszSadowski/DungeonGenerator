import Config from './app/config';
import {
    ctx,
    SCALE,
    DENSENESS,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';
import Dimensions from './utils/dimensions';

const scaleEl = <HTMLInputElement> document.getElementById('scale');
const roomHeightEl = <HTMLInputElement> document.getElementById('room-height');
const roomWidthEl = <HTMLInputElement> document.getElementById('room-width');
const densenessEl = <HTMLInputElement> document.getElementById('denseness');

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap, DENSENESS, 1);
config.init();

scaleEl.value = config.scale.toString();
scaleEl.addEventListener('change', () => {
    config.scale = +scaleEl.value;
    config.save();
});

roomHeightEl.value = config.divisable.height.toString();
roomHeightEl.addEventListener('change', () => {
    config.divisable = new Dimensions(+roomWidthEl.value, +roomHeightEl.value);
    config.save();
});

roomWidthEl.value = config.divisable.width.toString();
roomWidthEl.addEventListener('change', () => {
    config.divisable = new Dimensions(+roomWidthEl.value, +roomHeightEl.value);
    config.save();
});

densenessEl.value = config.denseness.toString();
densenessEl.addEventListener('change', () => {
    config.denseness = +densenessEl.value;
    config.save();
});
