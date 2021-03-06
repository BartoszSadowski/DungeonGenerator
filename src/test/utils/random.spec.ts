import {
    getRandomValue,
    getRandomColor
} from '../../utils/random';

function mockMathRandom(val: number) {
    const mock = Object.create(global.Math);
    mock.random = () => val;
    global.Math = mock;
}

describe('getRandomValue() - function retrieving random value from given range', () => {
    it('should give min value if 0 is recieved from Math.random', () => {
        mockMathRandom(0);

        expect(getRandomValue(50, 75)).toEqual(50);
    });

    it('should give max value if 0.999999 is recievedfrom Math.random', () => {
        mockMathRandom(0.999999);

        expect(getRandomValue(50, 75)).toEqual(75);
    });
});

describe('getRandomColor() - function retrieving random color', () => {
    it('should give color in rgb() format with 0 minimal value', () => {
        mockMathRandom(0);

        expect(getRandomColor()).toEqual('rgb(0,0,0)');
    });

    it('should give color in rgb() format with 255 minimal value', () => {
        mockMathRandom(0.999999);

        expect(getRandomColor()).toEqual('rgb(255,255,255)');
    });
});
