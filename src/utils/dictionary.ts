export const AXIS: Record<string, string> = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    UNDEFINED: 'UNDEFINED'
};

export enum Directions {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
    Default = 'UP',
    Center = 'CENTER',
    Floor = 'FLOOR'
}

export const SPRITE_TYPES: Record<string, string> = {
    BASE: 'BASE',
    WALL: 'WALL',
    DOOR: 'DOOR'
};

export enum Items {
    Empty = '',
    Door = 'D',
    Wall = 'W',
    Floor = 'F'
}

export enum Modifiers {
    None = ''
}

export enum RoomType {
    Default = 'Default',
    Dungeon = 'Dungeon',
    Entrance = 'Entrance',
    Exit = 'Exit'
}
