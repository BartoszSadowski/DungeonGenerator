import RoomMap from './roomMap';
import DungeonEvent from '../events/dungeonEvent';
import Config from '../config';
import Point from '../../utils/point';
import Line from '../../utils/line';
import Dimensions from '../../utils/dimensions';

import {
    AXIS,
    Directions,
    Items,
    RoomType,
    Modifiers
} from '../../utils/dictionary';
import {
    getRandomValue
} from '../../utils/random';

export default class Room {
    origin: Point;
    point2: Point;
    config: Config;
    childRooms: Room[] = [];
    doors: Line[] = [];
    divisionLine: Line;
    roomMap: RoomMap;
    type: RoomType = RoomType.Default;
    event?: DungeonEvent;

    readonly ROOM_TYPE_DEFINED = 'Room has already defined type';

    constructor(point1: Point, point2: Point, config: Config) {
        this.origin = point1;
        this.point2 = point2;
        this.config = config;
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

    setType(type: RoomType, override?: boolean) {
        if (this.type === RoomType.Default || override) {
            this.type = type;
        } else {
            throw Error(this.ROOM_TYPE_DEFINED);
        }
    }

    setEvent(event: DungeonEvent) {
        this.event = event;
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
                    this.config
                ),
                new Room(
                    new Point(newLine, this.origin.y),
                    this.point2,
                    this.config
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
                    this.config
                ),
                new Room(
                    new Point(this.origin.x, newLine),
                    this.point2,
                    this.config
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
            const { denseness } = this.config;
            const roomMap = new RoomMap(new Dimensions(this.width, this.height));

            const localOrigin = new Point(getRandomValue(0, denseness), getRandomValue(0, denseness));
            const localWidth = this.width - getRandomValue(0, denseness) - 1;
            const localHeight = this.height - getRandomValue(0, denseness) - 1;

            // Fill rooms with floors
            for (let i = localOrigin.y; i < localHeight + 1; i++) {
                for (let j = localOrigin.x; j < localWidth + 1; j++) {
                    roomMap.set(
                        new Point(j, i),
                        Items.Floor,
                        Directions.Floor
                    );
                }
            }

            // Add doors, and link them with rooms
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
                const mapPoint = new Point(x, y);
                roomMap.set(
                    mapPoint,
                    Items.Door,
                    dir
                );

                const route = roomMap.findShortestRoute(mapPoint, Items.Floor, Directions.Floor);
                route.forEach(point => {
                    roomMap.set(
                        point,
                        Items.Floor,
                        Directions.Floor
                    );
                });
            });

            // Wall it up
            roomMap
                .onEach((roomItem, x, y) => {
                    if (roomItem.has(Items.Floor, Directions.Floor)) {
                        const mapPoint = new Point(x, y);
                        ([
                            [Directions.Up, mapPoint.move(0, -1)],
                            [Directions.Down, mapPoint.move(0, 1)],
                            [Directions.Left, mapPoint.move(-1, 0)],
                            [Directions.Right, mapPoint.move(1, 0)]
                        ] as Array<[Directions, Point]>)
                            .forEach(([direction, point]) => {
                                try {
                                    const { item } = roomMap.get(point);
                                    if (!item.has(Items.Floor, Directions.Floor)) {
                                        roomMap.set(mapPoint, Items.Wall, direction);
                                    }
                                } catch (error) {
                                    if (error.message === roomMap.POINT_NOT_IN_MAP) {
                                        roomMap.set(mapPoint, Items.Wall, direction);
                                    }
                                }
                            });
                    }
                });

            if (this.type === RoomType.Entrance) {
                const point: Point = roomMap.getPossiblyNonEdgePoint();

                roomMap.set(point, Items.Enterance, Directions.Center);
            }

            if (this.type === RoomType.Exit) {
                const point: Point = roomMap.getPossiblyNonEdgePoint();

                roomMap.set(point, Items.Exit, Directions.Center);
            }

            if (this.type === RoomType.Event) {
                const point: Point = roomMap.getPossiblyNonEdgePoint();

                roomMap.set(
                    point,
                    Items.Event,
                    Directions.Center,
                    Modifiers.Variant,
                    this.event.variant
                );
            }

            this.roomMap = roomMap;
        }

        this.childRooms.forEach(room => room.plan());
    }

    draw() {
        if (this.childRooms.length === 0) {
            const { ctx, spriteMap, scale } = this.config;
            const scaledOrigin = this.origin.rescale(this.config.scale);

            this.roomMap.onEach((item, x, y) => item.draw(
                ctx,
                new Point(scaledOrigin.x + x * scale, scaledOrigin.y + y * scale),
                new Dimensions(scale, scale),
                spriteMap
            ));
        }

        this.childRooms.forEach(room => room.draw());
    }

    loadChildren(savedRoom: Room) {
        if (savedRoom.divisionLine) {
            this.divisionLine = new Line(
                new Point(savedRoom.divisionLine.point1.x, savedRoom.divisionLine.point1.y),
                new Point(savedRoom.divisionLine.point2.x, savedRoom.divisionLine.point2.y)
            );
        }

        try {
            this.setType(savedRoom.type);
            // eslint-disable-next-line no-empty
        } catch (e) {
        }

        savedRoom.doors
            .forEach(door => {
                this.doors.push(new Line(
                    new Point(door.point1.x, door.point1.y),
                    new Point(door.point2.x, door.point2.y)
                ));
            });

        savedRoom.childRooms
            .forEach((loadedRoom: Room) => {
                const room = new Room(
                    new Point(loadedRoom.origin.x, loadedRoom.origin.y),
                    new Point(loadedRoom.point2.x, loadedRoom.point2.y),
                    this.config
                );

                room.loadChildren(loadedRoom);

                this.childRooms.push(room);
            });

        if (!savedRoom.childRooms.length) {
            this.roomMap = new RoomMap(savedRoom.roomMap.dimensions);
            for (let i = 0; i < this.roomMap.dimensions.height; i++) {
                for (let j = 0; j < this.roomMap.dimensions.width; j++) {
                    // Items
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].bottom.item, Directions.Down);
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].center.item, Directions.Center);
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].floor.item, Directions.Floor);
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].left.item, Directions.Left);
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].right.item, Directions.Right);
                    this.roomMap.set(new Point(j, i), savedRoom.roomMap.map[i][j].top.item, Directions.Up);

                    // Modifiers
                    this.roomMap.map[i][j]
                        .addModifier(
                            Directions.Center,
                            Modifiers.Variant,
                            savedRoom.roomMap.map[i][j].center.modifiers[Modifiers.Variant]
                        );
                }
            }
        }
    }
}
