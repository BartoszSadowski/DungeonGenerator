import Point from './point';

export const AXIS: Record<string, string> = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    UNDEFINED: 'UNDEFINED'
};

export enum Directions {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

export const SPRITE_TYPES: Record<string, string> = {
    BASE: 'BASE',
    WALL: 'WALL',
    DOOR: 'DOOR'
};

export const SPRITE_LOCATIONS: Record<string, Point> = {
    [SPRITE_TYPES.BASE]: new Point(0, 0),
    [SPRITE_TYPES.WALL]: new Point(16, 0),
    [SPRITE_TYPES.DOOR]: new Point(0, 16)
};

export enum RoomMapItems {
    Empty = '',
    Door = 'D',
    DoubleDoor = 'B',
    Wall = 'W',
    Floor = 'F'
}
