import Config from './config';
import Point from '../utils/point';
import Line from '../utils/line';
import Dimensions from '../utils/dimensions';

import {
    AXIS,
    SPRITE_TYPES,
    Directions
} from '../utils/dictionary';
import {
    getRandomValue
} from '../utils/random';

export default class Room {
    point1: Point;
    point2: Point;
    config: Config;
    parentRoom: Room;
    childRooms: Room[];
    doors: Line[];
    divisionLine: Line;

    constructor(point1: Point, point2: Point, config: Config, parentRoom: Room) {
        this.point1 = point1;
        this.point2 = point2;
        this.config = config;
        this.parentRoom = parentRoom;
        this.childRooms = [];
        this.doors = [];
    }

    get width() {
        return Math.abs(this.point1.x - this.point2.x);
    }

    get height() {
        return Math.abs(this.point1.y - this.point2.y);
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
                this.point1.x + this.config.minDimension.width,
                this.point2.x - this.config.minDimension.width
            );

            this.divisionLine = new Line(
                new Point(newLine, this.point1.y),
                new Point(newLine, this.point2.y)
            );

            this.childRooms.push(
                new Room(
                    this.point1,
                    new Point(newLine, this.point2.y),
                    this.config,
                    this
                ),
                new Room(
                    new Point(newLine, this.point1.y),
                    this.point2,
                    this.config,
                    this
                )
            );
        } else {
            const newLine = getRandomValue(
                this.point1.y + this.config.minDimension.height,
                this.point2.y - this.config.minDimension.height
            );

            this.divisionLine = new Line(
                new Point(this.point1.x, newLine),
                new Point(this.point2.x, newLine)
            );

            this.childRooms.push(
                new Room(
                    this.point1,
                    new Point(this.point2.x, newLine),
                    this.config,
                    this
                ),
                new Room(
                    new Point(this.point1.x, newLine),
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

    connect() {
        if (this.childRooms.length === 0) {
            return;
        }
        // create connection
        if (this.divisionLine.axis === AXIS.VERTICAL) {
            const doorCut = getRandomValue(this.divisionLine.point1.y + 1, this.divisionLine.point2.y - 2);
            this.doors.push(new Line(
                new Point(this.divisionLine.point1.x, doorCut),
                new Point(this.divisionLine.point2.x, doorCut + 1)
            ));
        } else {
            const doorCut = getRandomValue(this.divisionLine.point1.x + 1, this.divisionLine.point2.x - 2);
            this.doors.push(new Line(
                new Point(doorCut, this.divisionLine.point1.y),
                new Point(doorCut + 1, this.divisionLine.point2.y)
            ));
        }

        this.childRooms.forEach(room => room.connect());
    }

    draw() {
        if (this.childRooms.length === 0) {
            const scaledPoint1 = this.point1.rescale(this.config.scale);

            this.drawBackground(scaledPoint1);
            this.drawOutline(scaledPoint1);
        } else {
            this.childRooms.forEach(room => room.draw());
        }

        this.drawDoors();
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

        if (this.doors.length !== 0) {
            this.doors.forEach(door => {
                door
                    .rescale(scale)
                    .draw(ctx, spriteMap.get(SPRITE_TYPES.DOOR), scale);
            });
        }
    }
}
