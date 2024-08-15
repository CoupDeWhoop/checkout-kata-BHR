import { Checkout } from '../src/checkout';

describe('checkout test', () => {
    let sut: Checkout;

    beforeEach(() => {
        sut = new Checkout();
    });

    it('should return 0 when passed empty string', () => {
        sut.scan('');
        const actual = sut.getTotalPrice();

        expect(actual).toBe(0);
    });

    it.each([
        { input: 'A', expected: 50 },
        { input: 'B', expected: 30 },
        { input: 'C', expected: 20 },
        { input: 'D', expected: 15 },
    ])('when passed $input should return $expected', ({ input, expected }) => {
        sut.scan(input);
        const actual = sut.getTotalPrice();
        expect(actual).toBe(expected);
    });
});
