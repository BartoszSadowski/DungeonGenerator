import Config from './config';
import Point from '../utils/point';
import Line from '../utils/line';
import Dimensions from '../utils/dimensions';
import RoomItem from './roomItem';

import {
    AXIS,
    SPRITE_TYPES,
    Directions,
    Items
} from '../utils/dictionary';
import {
    getRandomValue
} from '../utils/random';

export default class Room {
    origin: Point;
    point2: Point;
    config: Config;
    parentRoom: Room;
    childRooms: Room[];
    doors: Line[];
    divisionLine: Line;
    roomMap: Array<Array<RoomItem>>

    constructor(point1: Point, point2: Point, config: Config, parentRoom: Room) {
        this.origin = point1;
        this.point2 = point2;
        this.config = config;
        this.parentRoom = parentRoom;
        this.childRooms = [];
        this.doors = [];
    }

    get width() {
        return Math.abs(this.origin.x - this.point2.x);
    }

    get height() {
        return Math.abs(this.origin.y - this.point2.y);
    }

    get sides(): Line[] {
        return [
            new Line(
                this.origin,
                new Point(this.origin.x, this.point2.y)
            ),
            new Line(
                this.origin,
                new Point(this.point2.x, this.origin.y)
            ),
            new Line(
                this.point2,
                new Point(this.origin.x, this.point2.y)
            ),
            new Line(
                this.point2,
                new Point(this.point2.x, this.origin.y)
            )
        ];
    }

    divide() {
        if (this.childRooms.length > 0) {
            throw new Error('This room has already been divided');
        }
        const isWide = this.width > this.config.divisable.width;
        const isHigh = this.height > this.config.divisable.height;

        let divideVerticly;

        if (!isWide && !isHigh) {
            return 'Room is not dividable';
        }
        if (isWide && isHigh) {
            divideVerticly = Math.random() >= 0.5;
        } else {
            divideVerticly = isWide;
        }

        if (divideVerticly) {
            const newLine = getRandomValue(
                this.origin.x + this.config.minDimension.width,
                this.point2.x - this.config.minDimension.width
            );

            this.divisionLine = new Line(
                new Point(newLine, this.origin.y),
                new Point(newLine, this.point2.y)
            );

            this.childRooms.push(
                new Room(
                    this.origin,
                    new Point(newLine, this.point2.y),
                    this.config,
                    this
                ),
                new Room(
                    new Point(newLine, this.origin.y),
                    this.point2,
                    this.config,
                    this
                )
            );
        } else {
            const newLine = getRandomValue(
                this.origin.y + this.config.minDimension.height,
                this.point2.y - this.config.minDimension.height
            );

            this.divisionLine = new Line(
                new Point(this.origin.x, newLine),
                new Point(this.point2.x, newLine)
            );

            this.childRooms.push(
                new Room(
                    this.origin,
                    new Point(this.point2.x, newLine),
                    this.config,
                    this
                ),
                new Room(
                    new Point(this.origin.x, newLine),
                    this.point2,
                    this.config,
                    this
                )
            );
        }

        this.childRooms.forEach(room => {
            room.divide();
        });

        return 'Room divided';
    }

    addDoor(door: Line): void {
        this.doors.push(door);

        if (this.childRooms.length !== 0) {
            this.childRooms.forEach(room => {
                if (room.sides.find(side => side.contains(door))) {
                    room.addDoor(door);
                }
            });
        }
    }

    connect(): void {
        if (this.childRooms.length === 0) {
            return;
        }
        let door: Line;

        // create connection
        if (this.divisionLine.axis === AXIS.VERTICAL) {
            const doorCut = getRandomValue(this.divisionLine.point1.y, this.divisionLine.point2.y - 1);
            door = new Line(
                new Point(this.divisionLine.point1.x, doorCut),
                new Point(this.divisionLine.point2.x, doorCut + 1)
            );
        } else {
            const doorCut = getRandomValue(this.divisionLine.point1.x, this.divisionLine.point2.x - 1);
            door = new Line(
                new Point(doorCut, this.divisionLine.point1.y),
                new Point(doorCut + 1, this.divisionLine.point2.y)
            );
        }

        this.childRooms.forEach(room => {
            room.addDoor(door);
            room.connect();
        });
    }

    plan(): void {
        if (this.childRooms.length === 0) {
            const roomMap: Array<Array<RoomItem>> = [];

            for (let i = 0; i < this.height; i++) {
                roomMap.push([]);
                for (let j = 0; j < this.width; j++) {
                    roomMap[i].push(new RoomItem());
                }
            }

            this.doors.forEach(door => {
                let x: number;
                let y: number;
                let dir: Directions;
                if (
                    this.origin.x === door.point2.x
                    && this.origin.x === door.point1.x
                ) {
                    x = 0;
                    y = door.point1.y - this.origin.y;
                    dir = Directions.Left;
                } else if (
                    this.origin.y === door.point2.y
                    && this.origin.y === door.point1.y
                ) {
                    x = door.point1.x - this.origin.x;
                    y = 0;
                    dir = Directions.Up;
                } else if (
                    this.origin.x + this.width === door.point2.x
                    && this.origin.x + this.width === door.point1.x
                ) {
                    x = this.width - 1;
                    y = door.point1.y - this.origin.y;
                    dir = Directions.Right;
                } else {
                    x = door.point1.x - this.origin.x;
                    y = this.height - 1;
                    dir = Directions.Down;
                }
                roomMap[y][x].set(Items.Door, dir);
            });

            for (let i = 0; i < this.width; i++) {
                roomMap[0][i].set(Items.Wall, Directions.Up);
                roomMap[this.height - 1][i].set(Items.Wall, Directions.Down);
            }
            for (let i = 0; i < this.height; i++) {
                roomMap[i][0].set(Items.Wall, Directions.Left);
                roomMap[i][this.width - 1].set(Items.Wall, Directions.Right);
            }

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    roomMap[i][j].set(Items.Floor, Directions.Floor);
                }
            }

            this.roomMap = roomMap;
        }

        this.childRooms.forEach(room => room.plan());
    }

    draw() {
        if (this.childRooms.length === 0) {
            const scaledPoint1 = this.origin.rescale(this.config.scale);

            this.drawBackground(scaledPoint1);
            this.drawOutline(scaledPoint1);
            this.drawDoors();
        }

        this.childRooms.forEach(room => room.draw());
    }

    drawBackground(origin: Point) {
        const { ctx, spriteMap, scale } = this.config;

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                spriteMap
                    .get(SPRITE_TYPES.BASE)
                    .draw(
                        ctx,
                        new Point(origin.x + (i * scale), origin.y + (j * scale)),
                        new Dimensions(scale, scale)
                    );
            }
        }
    }

    drawOutline(origin: Point) {
        const { ctx, spriteMap, scale } = this.config;

        for (let i = 0; i < this.width; i++) {
            spriteMap
                .get(SPRITE_TYPES.WALL)
                .draw(
                    ctx,
                    new Point(origin.x + (i * scale), origin.y),
                    new Dimensions(scale, scale),
                    Directions.Up
                )
                .draw(
                    ctx,
                    new Point(origin.x + (i * scale), origin.y + (scale * (this.height - 1))),
                    new Dimensions(scale, scale),
                    Directions.Down
                );
        }
        for (let i = 0; i < this.height; i++) {
            spriteMap
                .get(SPRITE_TYPES.WALL)
                .draw(
                    ctx,
                    new Point(origin.x, origin.y + (i * scale)),
                    new Dimensions(scale, scale),
                    Directions.Left
                )
                .draw(
                    ctx,
                    new Point(origin.x + ((this.width - 1) * scale), origin.y + (scale * i)),
                    new Dimensions(scale, scale),
                    Directions.Right
                );
        }
    }

    drawDoors() {
        const { ctx, spriteMap, scale } = this.config;

        this.doors.forEach(door => {
            door
                .rescale(scale)
                .draw(ctx, spriteMap.get(SPRITE_TYPES.DOOR), scale);
        });
    }
}
