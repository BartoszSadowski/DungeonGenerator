import Point from './point';
import { SPRITE_TYPES } from './dictionary';

const SPRITE_LOCATIONS: Record<string, Point> = {
    [SPRITE_TYPES.BASE]: new Point(0, 0),
    [SPRITE_TYPES.WALL]: new Point(16, 0),
    [SPRITE_TYPES.DOOR]: new Point(0, 16)
};

export default SPRITE_LOCATIONS;
