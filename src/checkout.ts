interface Price {
    [key: string]: number;
}

export class Discount {
    private item: string;
    private quantity: number;
    private discount: number;

    constructor(itemCode: string, quantity: number, reduction: number) {
        this.item = itemCode;
        this.quantity = quantity;
        this.discount = reduction;
    }

    calculateDiscount(itemsList: string[]): number {
        const itemCount = itemsList.filter((item) => item === this.item).length;
        const itemDiscount =
            Math.floor(itemCount / this.quantity) * this.discount;
        return itemDiscount;
    }
}

export class Shop {
    discountList: Discount[] = [];

    priceList: { [key: string]: number } = {};
    basket: string[] = [];

    addItem(sku: string, price: number) {
        this.priceList[sku] = price;
    }

    addDiscount(itemCode: string, quantity: number, reduction: number) {
        const discount = new Discount(itemCode, quantity, reduction);
        this.discountList.push(discount);
    }

    scan(item: string): void {
        this.basket.push(item);
    }
    calculateDiscount(): number {
        return this.discountList.reduce((total, discount) => {
            return total + discount.calculateDiscount(this.basket);
        }, 0);
    }

    getTotalPrice(): number {
        let total = 0;
        this.basket.forEach((item) => {
            total += this.priceList[item] || 0;
        });

        total -= this.calculateDiscount();
        return total;
    }
}
