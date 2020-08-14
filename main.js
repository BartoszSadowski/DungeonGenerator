const canvas = document.getElementById('demoCanvas');

const getRandomValue = (min, max) =>  min + Math.floor(Math.random() * (max - min + 1));

class Config {
    constructor(minWidth, minHeight) {
        this.minWdith = minWidth;
        this.minHeight = minHeight;
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
        const isWide = this.width > this.config.minWdith;
        const isHigh = this.height > this.config.minWdith;

        let divideVerticly;

        if (!isWide && !isHigh) {
            throw new Error('This room is not dividable');
        } else if (isWide && isHigh) {
            divideVerticly = Math.random() >= 0.5;
        } else {
            divideVerticly = isWide;
        }

        if (divideVerticly) {
            const newLine = getRandomValue(this.point1.x, this.point2.x);

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
            const newLine = getRandomValue(this.point1.y, this.point2.y);

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
    }
}
