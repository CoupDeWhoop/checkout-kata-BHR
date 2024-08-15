export class Checkout {
    private items: string[] = [];

    scan(item: string): void {
        this.items.push(item);
    }

    getTotalPrice(): number {
        let total = 0;
        this.items.forEach((item) => {
            if (item === 'A') total += 50;
            if (item === 'B') total += 30;
            if (item === 'C') total += 20;
            if (item === 'D') total += 15;
        });
        return total;
    }
}
