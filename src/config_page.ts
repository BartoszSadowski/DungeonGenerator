import Config from './app/config';
import {
    ctx,
    SCALE,
    DENSENESS,
    spriteMap,
    divisable,
    minDimension,
    lootChance,
    dangerChance
} from './data/configData';
import Dimensions from './utils/dimensions';

const scaleEl = <HTMLInputElement> document.getElementById('scale');
const roomHeightEl = <HTMLInputElement> document.getElementById('room-height');
const roomWidthEl = <HTMLInputElement> document.getElementById('room-width');
const densenessEl = <HTMLInputElement> document.getElementById('denseness');
const dangerChanceEl = <HTMLInputElement> document.getElementById('danger');
const lootChanceEl = <HTMLInputElement> document.getElementById('loot');

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap, DENSENESS, lootChance, dangerChance);
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

dangerChanceEl.value = config.dangerChance.toString();
dangerChanceEl.addEventListener('change', () => {
    config.dangerChance = +dangerChanceEl.value;
    console.log(config);
    config.save();
});

lootChanceEl.value = config.lootChance.toString();
lootChanceEl.addEventListener('change', () => {
    config.lootChance = +lootChanceEl.value;
    console.log(config);
    config.save();
});
