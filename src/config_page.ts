import Config from './app/config';
import {
    ctx,
    SCALE,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';

const scaleEl = <HTMLInputElement> document.getElementById('scale');

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap);
config.init();

scaleEl.value = config.scale.toString();
scaleEl.addEventListener('change', () => {
    config.scale = +scaleEl.value;
    config.save();
});
