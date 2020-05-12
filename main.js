const canvas = document.getElementById('demoCanvas');

const width = () => document.body.clientWidth;
const height = () => document.body.clientHeight;

const LINE_ORIENTATION = {
    HORIZONTAL: 1,
    VERTICAL: -1,
    NONE: 0
};

const MINIMAL_ROOM_SIZE = {
    HORIZONTAL: 100,
    VERTICAL: 100
}

const BIG_ROOMS_CHANCE = 100000;

const getRandomValue = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomOrientation = (chance = 1) => {
    const randomOrientation = getRandomValue(-chance, chance);
    if (randomOrientation > 0) {
        return LINE_ORIENTATION.HORIZONTAL;
    } else if (randomOrientation < 0) {
        return LINE_ORIENTATION.VERTICAL;
    } else {
        return LINE_ORIENTATION.NONE;
    }
};

const getRandomLineDivision = (p1, p2, minValue) => {
    return getRandomValue(p1 + minValue, p2 - minValue);
};


const drawLine = (ctx, x1, y1, x2, y2, color = "#fff") => {
    const prevColor = ctx.strokeStyle;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = prevColor;
}

canvas.width = width();
canvas.height = height();

const ctx = canvas.getContext('2d');

ctx.fillRect(0, 0, width(), height());

class Room {
    constructor(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.division = LINE_ORIENTATION.NONE;
        this.minValues = {
            width: MINIMAL_ROOM_SIZE.VERTICAL,
            height: MINIMAL_ROOM_SIZE.HORIZONTAL
        };
    }

    get width() {
        return Math.abs(this.x2 - this.x1);
    }

    get height() {
        return Math.abs(this.y2 - this.y1);
    }

    get isRoomDivisableVerticaly() {
        return 2*this.minValues.height <= this.height;
    }

    get isRoomDivisableHorizontaly() {
        return 2*this.minValues.width <= this.width;
    }

    randomDivisionOrientation() {
        const orientation = getRandomOrientation(BIG_ROOMS_CHANCE);

        if (
            (orientation == LINE_ORIENTATION.HORIZONTAL && !this.isRoomDivisableHorizontaly)
            || (orientation == LINE_ORIENTATION.VERTICAL && !this.isRoomDivisableVerticaly)
        ) {
            return LINE_ORIENTATION.NONE;
        } else {
            return orientation;
        }
    }

    setDivision(line) {
        this.division = line;
    }
}

function generateNextRooms(index, orientation) {
    const currentRoom = dungeon[index];
    let coords = {
        x1: currentRoom.x1,
        x2: currentRoom.x2,
        y1: currentRoom.y1,
        y2: currentRoom.y2
    }

    currentRoom.setDivision(orientation);

    switch (orientation) {
        case LINE_ORIENTATION.VERTICAL:
            coords.y1 = getRandomLineDivision(currentRoom.y1, currentRoom.y2, MINIMAL_ROOM_SIZE.VERTICAL);
            coords.y2 = coords.y1;
            break;
        case LINE_ORIENTATION.HORIZONTAL:
            coords.x1 = getRandomLineDivision(currentRoom.x1, currentRoom.x2, MINIMAL_ROOM_SIZE.HORIZONTAL);
            coords.x2 = coords.x1;
            break;
        case LINE_ORIENTATION.NONE:
            console.log('Rooms division finished');
            return;
    }

    nextRooms = [(index + 1) * 2 - 1, (index + 1) * 2];

    dungeon[nextRooms[0]] = new Room(currentRoom.x1, coords.x2, currentRoom.y1, coords.y2);
    dungeon[nextRooms[1]] = new Room(coords.x1, currentRoom.x2, coords.y1, currentRoom.y2);

    
    drawLine(
        ctx,
        coords.x1,
        coords.y1,
        coords.x2,
        coords.y2
    );

    generateNextRooms(nextRooms[0], dungeon[nextRooms[0]].randomDivisionOrientation());
    generateNextRooms(nextRooms[1], dungeon[nextRooms[1]].randomDivisionOrientation());

    return;
}

let dungeon = [new Room(0, width(), 0, height())];

generateNextRooms(0, dungeon[0].randomDivisionOrientation());

console.log(dungeon);
