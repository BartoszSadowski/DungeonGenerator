import Dimensions from '../../utils/dimensions';
import Point from '../../utils/point';
import RoomItem from './roomItem';
import {
    Items,
    Directions
} from '../../utils/dictionary';

type onEachItemFunction = (item: RoomItem, x: number, y: number) => any;

type mappedRoomItem = {
    point: Point
    item: RoomItem
}

interface Neighbour extends mappedRoomItem {
    route: Point[]
}

export default class RoomMap {
    map: Array<Array<RoomItem>>;
    dimensions: Dimensions;

    // Error maessages
    POINT_NOT_IN_MAP = 'Point not in map';

    constructor(dimensions: Dimensions) {
        this.map = [];
        for (let i = 0; i < dimensions.height; i++) {
            this.map.push([]);
            for (let j = 0; j < dimensions.width; j++) {
                this.map[i].push(new RoomItem());
            }
        }

        this.dimensions = dimensions;
    }

    get(point: Point) {
        if (
            point.y < this.dimensions.height
            && point.y >= 0
            && point.x < this.dimensions.width
            && point.x >= 0
        ) {
            return {
                item: this.map[point.y][point.x],
                point
            };
        }

        throw new Error(this.POINT_NOT_IN_MAP);
    }

    set(point: Point, item: Items, direction: Directions) {
        this.map[point.y][point.x].set(item, direction);
    }

    onEach(call: onEachItemFunction) {
        this.map.reduce((acc, row, y) => {
            row.reduce((acc2, item, x) => {
                call(item, x, y);
                return acc2;
            }, 0);
            return acc;
        }, 0);
    }

    getNeighbours({ x, y }: Point, discriminate?: Point): mappedRoomItem[] {
        const neighbourPoints: Point[] = [
            new Point(x + 1, y),
            new Point(x - 1, y),
            new Point(x, y + 1),
            new Point(x, y - 1)
        ].filter(point => !discriminate || !point.isSame(discriminate));

        return neighbourPoints
            .filter(point => (
                point.x >= 0
                && point.y >= 0
                && point.x < this.dimensions.width
                && point.y < this.dimensions.height
            ))
            .map(point => this.get(point));
    }

    findShortestRoute(from: Point, to: Items, direction: Directions): Point[] {
        if (this.get(from).item.get(direction).item === to) {
            return [];
        }

        let neighbours: Neighbour[] = this.getNeighbours(from, from)
            .map(item => ({
                ...item,
                route: [from, item.point]
            }));

        let j = this.dimensions.width + this.dimensions.height;

        while (j) {
            for (let i = 0; i < neighbours.length; i++) {
                if (neighbours[i].item.get(direction).item === to) {
                    return neighbours[i].route;
                }
            }
            neighbours = neighbours
                .reduce((array: Neighbour[], neighbour) => array.concat(
                    this.getNeighbours(neighbour.point, neighbour.point)
                        .map(item => ({
                            ...item,
                            route: neighbour.route.concat(item.point)
                        }))
                ), []);
            j -= 1;
        }
        throw new Error('Element not found');
    }
}