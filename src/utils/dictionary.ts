import Point from './point';

export const AXIS: Record<string, string> = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    UNDEFINED: 'UNDEFINED'
};

export const SPRITE_TYPES: Record<string, string> = {
    BASE: 'BASE',
    WALL_UP: 'WALL_UP',
    WALL_LEFT: 'WALL_LEFT',
    WALL_DOWN: 'WALL_DOWN',
    WALL_RIGHT: 'WALL_RIGHT',
    DOOR_UP: 'DOOR_UP',
    DOOR_LEFT: 'DOOR_LEFT',
    DOOR_DOWN: 'DOOR_DOWN',
    DOOR_RIGHT: 'DOOR_RIGHT'
};

export const SPRITE_LOCATIONS: Record<string, Point> = {
    [SPRITE_TYPES.BASE]: new Point(0, 0),
    [SPRITE_TYPES.WALL_UP]: new Point(0, 16),
    [SPRITE_TYPES.WALL_LEFT]: new Point(0, 32),
    [SPRITE_TYPES.WALL_DOWN]: new Point(16, 0),
    [SPRITE_TYPES.WALL_RIGHT]: new Point(16, 16),
    [SPRITE_TYPES.DOOR_UP]: new Point(16, 32),
    [SPRITE_TYPES.DOOR_LEFT]: new Point(32, 0),
    [SPRITE_TYPES.DOOR_DOWN]: new Point(32, 16),
    [SPRITE_TYPES.DOOR_RIGHT]: new Point(32, 32)
};
