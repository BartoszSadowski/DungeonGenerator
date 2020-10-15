export const getRandomValue = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
export function getRandomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
