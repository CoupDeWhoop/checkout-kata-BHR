export class Checkout {
    private items: string[] = [];

    scan(item: string): void {
        this.items.push(item);
    }

    getTotalPrice(): number {
        if (this.items[0] === 'A') return 50;
        if (this.items[0] === 'B') return 30;
        if (this.items[0] === 'C') return 20;
        if (this.items[0] === 'D') return 15;

        return 0;
    }
}
