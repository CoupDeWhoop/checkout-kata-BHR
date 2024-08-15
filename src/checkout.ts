export class Checkout {
    private items: string[] = [];

    scan(item: string): void {
        this.items.push(item);
    }

    getTotalPrice(): number {
        return 0;
    }
}
