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
            { input: ['B', 'C'], expected: 50 },
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

    describe('discounts', () => {
        it.each([
            { input: ['A', 'A', 'A'], expected: 130 },
            { input: ['B', 'B'], expected: 45 },
            { input: ['B', 'B', 'D'], expected: 60 },
            { input: ['A', 'A', 'A', 'B', 'B', 'B', 'B'], expected: 220 },
        ])(
            'when passed $input should return $expected',
            ({ input, expected }) => {
                input.forEach((item) => sut.scan(item));
                const actual = sut.getTotalPrice();
                expect(actual).toBe(expected);
            }
        );
    });
});
