import Dimensions from './dimensions';
import Point from './point';
import { roundDown } from './calculate';

export function calculateCanvas(width: number, height: number, scale: number): Dimensions {
    const padding = Math.max(width, height) * 0.02;
    const result = new Dimensions(
        roundDown(width - padding, scale),
        roundDown(height - padding, scale)
    );

    return result;
}

export function calculateDungeonPoint(dimensions: Dimensions, scale: number): Point {
    return new Point(dimensions.width / scale, dimensions.height / scale);
}
