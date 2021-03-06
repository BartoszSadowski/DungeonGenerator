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
    DOOR: 'DOOR',
    ENTERANCE: 'ENTERANCE',
    EXIT: 'EXIT',
    EVENT_A: 'EVENT_A',
    EVENT_B: 'EVENT_B',
    EVENT_C: 'EVENT_C',
    EVENT_D: 'EVENT_D',
    EVENT_E: 'EVENT_E',
    MISC_A: 'MISC_A',
    MISC_B: 'MISC_B',
    MISC_C: 'MISC_C',
    MISC_D: 'MISC_D',
    MISC_E: 'MISC_E',
    MISC_F: 'MISC_F'
};

export enum Items {
    Empty = '',
    Door = 'D',
    Wall = 'W',
    Floor = 'F',
    Enterance = 'E',
    Exit = 'X',
    Event = 'e',
    Misc = 'M'
}

export enum Modifiers {
    None = '',
    Variant = 'V'
}

export enum RoomType {
    Default = 'Default',
    Dungeon = 'Dungeon',
    Entrance = 'Entrance',
    Exit = 'Exit',
    Event = 'Event'
}

export enum StorageItems {
    Dungeon = 'Dungeon',
    Config = 'Config'
}

export enum EventTypes {
    Default = 'Default',
    Enemy = 'Enemy',
    Item = 'Item'
}
