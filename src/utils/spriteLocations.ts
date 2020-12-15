import Point from './point';
import { SPRITE_TYPES } from './dictionary';

const SPRITE_LOCATIONS: Record<string, Point> = {
    [SPRITE_TYPES.BASE]: new Point(0, 0),
    [SPRITE_TYPES.WALL]: new Point(16, 0),
    [SPRITE_TYPES.DOOR]: new Point(32, 0),
    [SPRITE_TYPES.ENTERANCE]: new Point(0, 16),
    [SPRITE_TYPES.EXIT]: new Point(16, 16),
    [SPRITE_TYPES.EVENT_A]: new Point(32, 16),
    [SPRITE_TYPES.EVENT_B]: new Point(0, 32),
    [SPRITE_TYPES.EVENT_C]: new Point(16, 32),
    [SPRITE_TYPES.EVENT_D]: new Point(32, 32),
    [SPRITE_TYPES.EVENT_E]: new Point(0, 48)
};

export default SPRITE_LOCATIONS;
