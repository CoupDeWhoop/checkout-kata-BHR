import { Shop } from '../src/checkout';

describe('Checkout Tests', () => {
    let sut: Shop;

    beforeEach(() => {
        sut = new Shop();
        sut.addItem('A', 50);
        sut.addItem('B', 30);
        sut.addItem('C', 20);
        sut.addItem('D', 15);
        sut.addDiscount('A', 3, 20);
        sut.addDiscount('B', 2, 15);
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

    it('should ignore an unknown item', () => {
        ['A', '%', 'A'].forEach((item) => sut.scan(item));
        const actual = sut.getTotalPrice();

        expect(actual).toBe(100);
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
