export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rescale(scale: number) {
        return new Point(this.x * scale, this.y * scale);
    }

    move(x: number, y: number) {
        return new Point(this.x + x, this.y + y);
    }
}
