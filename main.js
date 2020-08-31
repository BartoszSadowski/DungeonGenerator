const canvas = document.getElementById('demoCanvas');

const getRandomValue = (min, max) =>  min + Math.floor(Math.random() * (max - min + 1));

class Dimensions {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Config {
    constructor(divisable, minDimension) {
        this.divisable = divisable;
        this.minDimension = minDimension;
    }
}

class Point {
    constructor(x, y) {
        this.x = x,
        this.y = y
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
    const { divisable, minDimension, dungeonPoint } = options;
    const config = new Config(divisable, minDimension);

    const dungeon = new Dungeon(dungeonPoint, config);

    dungeon.divide();

    console.log(dungeon);
})({
    divisable: new Dimensions(10, 10),
    minDimension: new Dimensions(3, 3),
    dungeonPoint: new Point(50, 50)
});
