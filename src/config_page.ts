import Config from './app/config';
import {
    ctx,
    SCALE,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';
import {
    StorageItems
} from './utils/dictionary';

const scaleEl = <HTMLInputElement> document.getElementById('scale');

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap);
if (!sessionStorage.getItem(StorageItems.Config)) {
    config.save();
} else {
    config.load();
}

console.log(config);
scaleEl.addEventListener('change', () => {
    console.log(scaleEl.value);
});
