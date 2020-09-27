const canvas = <HTMLCanvasElement> document.getElementById('demoCanvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

const AXIS = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    UNDEFINED: 'UNDEFINED'
};

const getRandomValue = (min: number, max: number) =>  min + Math.floor(Math.random() * (max - min + 1));

function getRandomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function canvasInit(canvasDimensions: Dimensions) {
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x,
        this.y = y
    }

    rescale(scale: number) {
        return new Point(this.x * scale, this.y * scale);
    }
}

class Line {
    point1: Point;
    point2: Point;

    constructor(point1: Point, point2: Point) {
        this.point1 = point1;
        this.point2 = point2;
    }

    rescale(scale: number) {
        return new Line(
            this.point1.rescale(scale),
            this.point2.rescale(scale)
        );
    }

    get axis() {
        if (this.point1.x === this.point2.x) {
            return AXIS.VERTICAL;
        } else if (this.point1.y === this.point2.y) {
            return AXIS.HORIZONTAL;
        } else {
            return AXIS.UNDEFINED;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
    }
}

class Dimensions {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

class Config {
    divisable: Dimensions;
    minDimension: Dimensions;
    scale: number;

    constructor(divisable: Dimensions, minDimension: Dimensions, scale: number) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
    }
}

class Room {
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
        this.divisionLine;
    }

    get width() {
        return Math.abs(this.point1.x - this.point2.x)
    }

    get height() {
        return Math.abs(this.point1.y - this.point2.y)
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
        } else if (isWide && isHigh) {
            divideVerticly = Math.random() >= 0.5;
        } else {
            divideVerticly = isWide;
        }

        if (divideVerticly) {
            const newLine = getRandomValue(this.point1.x + this.config.minDimension.width, this.point2.x - this.config.minDimension.width);

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
                ));
        } else {
            const newLine = getRandomValue(this.point1.y + this.config.minDimension.height, this.point2.y - this.config.minDimension.height);

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
                ));
        }

        this.childRooms.forEach(room => {
            room.divide();
        });

        return 'Room divided';
    }

    connect() {
        if (this.childRooms.length === 0) {
            return;
        } else {
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
    }

    draw() {
        if (this.childRooms.length === 0) {
            const scaledPoint1 = this.point1.rescale(this.config.scale);
            const scaledWidth = this.width * this.config.scale;
            const scaledHeight = this.height * this.config.scale;

            ctx.strokeStyle = '#a0a0a0';
            ctx.lineWidth = 1;
            ctx.strokeRect(scaledPoint1.x, scaledPoint1.y, scaledWidth, scaledHeight);
        } else {
            this.childRooms.forEach(room => room.draw());
        }

        if (this.doors.length !== 0) {
            this.doors.forEach(door => {
                door.rescale(this.config.scale).draw(ctx);
            });
        }
    }
}

class Dungeon extends Room {
    constructor(dungeonPoint: Point, config: Config) {
        super(
            new Point(0, 0),
            dungeonPoint,
            config,
            null
        );
    }

    create() {
        this.divide();
        this.connect();
        this.draw();
    }
}

(function init(options){
    const {
        divisable,
        minDimension,
        scale,
        dungeonPoint,
        canvasDimensions
    } = options;

    canvasInit(canvasDimensions);

    const config = new Config(divisable, minDimension, scale);

    const dungeon = new Dungeon(dungeonPoint, config);

    dungeon.create();
    console.log(dungeon);
})({
    divisable: new Dimensions(20, 20),
    minDimension: new Dimensions(4, 4),
    dungeonPoint: new Point(54, 30),
    canvasDimensions: new Dimensions(document.body.clientWidth, document.body.clientHeight),
    scale: 35
});
