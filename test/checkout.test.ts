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
});
