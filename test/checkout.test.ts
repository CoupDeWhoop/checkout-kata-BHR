import { Checkout } from '../src/checkout';

describe('Checkout Tests', () => {
    let sut: Checkout;

    beforeEach(() => {
        sut = new Checkout();
    });

    it('should return 0 when passed empty string', () => {
        sut.scan('');
        const actual = sut.getTotalPrice();

        expect(actual).toBe(0);
    });

    describe('single item', () => {
        it.each([
            { input: 'A', expected: 50 },
            { input: 'B', expected: 30 },
            { input: 'C', expected: 20 },
            { input: 'D', expected: 15 },
        ])(
            'when passed $input should return $expected',
            ({ input, expected }) => {
                sut.scan(input);
                const actual = sut.getTotalPrice();
                expect(actual).toBe(expected);
            }
        );
    });

    describe('Multiple items', () => {
        it.each([
            { input: ['A', 'A'], expected: 100 },
            { input: ['B', 'B'], expected: 60 },
            { input: ['C', 'D'], expected: 35 },
            { input: ['A', 'B', 'C', 'D'], expected: 115 },
        ])(
            'when passed $input should return $expected',
            ({ input, expected }) => {
                input.forEach((item) => sut.scan(item));
                const actual = sut.getTotalPrice();
                expect(actual).toBe(expected);
            }
        );
    });

    describe('', () => {});
});
