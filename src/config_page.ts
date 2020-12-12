import Config from './app/config';
import {
    ctx,
    SCALE,
    spriteMap,
    divisable,
    minDimension
} from './data/configData';

const config = new Config(divisable, minDimension, SCALE, ctx, spriteMap);

console.log(config);
