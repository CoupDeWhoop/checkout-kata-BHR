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

    getTotalPrice(): number {
        let total = 0;
        this.items.forEach((item) => {
            total += prices[item] || 0;
        });
        return total;
    }
}
