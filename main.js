const canvas = document.getElementById('demoCanvas');
const ctx = canvas.getContext('2d');

const getRandomValue = (min, max) =>  min + Math.floor(Math.random() * (max - min + 1));

function getRandomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

class Dimensions {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Config {
    constructor(divisable, minDimension, scale) {
        this.divisable = divisable;
        this.minDimension = minDimension;
        this.scale = scale;
    }
}

class Point {
    constructor(x, y) {
        this.x = x,
        this.y = y
    }

    rescale(scale) {
        return new Point(this.x * scale, this.y * scale);
    }
}

class Room {
    constructor(point1, point2, config, parentRoom) {
        this.point1 = point1;
        this.point2 = point2;
        this.config = config;
        this.parentRoom = parentRoom;
        this.childRooms = [];
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

    draw() {
        if (this.childRooms.length === 0) {
            const scaledPoint1 = this.point1.rescale(this.config.scale);
            const scaledWidth = this.width * this.config.scale;
            const scaledHeight = this.height * this.config.scale;

            ctx.fillStyle = getRandomColor();
            ctx.fillRect(scaledPoint1.x, scaledPoint1.y, scaledWidth, scaledHeight);
        } else {
            this.childRooms.forEach(room => room.draw());
        }
    }
}

class Dungeon extends Room {
    constructor(dungeonPoint, config) {
        super(
            new Point(0, 0),
            dungeonPoint,
            config,
            null
        );
    }
}

(function init(options){
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    const { divisable, minDimension, scale, dungeonPoint } = options;
    const config = new Config(divisable, minDimension, scale);

    const dungeon = new Dungeon(dungeonPoint, config);

    dungeon.divide();
    dungeon.draw();
})({
    divisable: new Dimensions(10, 10),
    minDimension: new Dimensions(4, 3),
    dungeonPoint: new Point(42, 30),
    scale: 30
});
