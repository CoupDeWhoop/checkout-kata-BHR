const prices: { [key: string]: number } = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
};

export class Checkout {
    private items: string[] = [];

    scan(item: string): void {
        this.items.push(item);
    }

    calculateDiscount(): number {
        const ACount = this.items.filter((item) => item === 'A').length;
        const BCount = this.items.filter((item) => item === 'B').length;

        const ADiscount = Math.floor(ACount / 3) * 20;
        const BDiscount = Math.floor(BCount / 2) * 15;

        return ADiscount + BDiscount;
    }

    getTotalPrice(): number {
        let total = 0;
        this.items.forEach((item) => {
            total += prices[item] || 0;
        });

        total -= this.calculateDiscount();
        return total;
    }
}
