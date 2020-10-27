import Point from './point';

export const AXIS = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    UNDEFINED: 'UNDEFINED'
};

export const SPRITE_LOCATIONS = {
    BASE: new Point(0, 0),
    WALL_UP: new Point(0, 16),
    WALL_LEFT: new Point(0, 32),
    WALL_DOWN: new Point(16, 0),
    WALL_RIGHT: new Point(16, 16),
    DOOR_UP: new Point(16, 32),
    DOOR_LEFT: new Point(32, 0),
    DOOR_DOWN: new Point(32, 16),
    DOOR_RIGHT: new Point(32, 32)
};
