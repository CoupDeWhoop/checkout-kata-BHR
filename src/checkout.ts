const prices: { [key: string]: number } = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
};

export class Discount {
    private item: string;
    private quantity: number;
    private discount: number;

    constructor(itemCode: string, quantity: number, discount: number) {
        this.item = itemCode;
        this.quantity = quantity;
        this.discount = discount;
    }

    calculateDiscount(itemsList: string[]): number {
        const itemCount = itemsList.filter((item) => item === this.item).length;
        const itemDiscount =
            Math.floor(itemCount / this.quantity) * this.discount;
        return itemDiscount;
    }
}

export class Checkout {
    private items: string[] = [];

    scan(item: string): void {
        this.items.push(item);
    }

    calculateDiscount(): number {
        const ADiscount = new Discount('A', 3, 20);
        const BDiscount = new Discount('B', 2, 15);
        const totalDiscount =
            ADiscount.calculateDiscount(this.items) +
            BDiscount.calculateDiscount(this.items);
        return totalDiscount;
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
