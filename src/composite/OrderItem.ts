import { OrderComponent } from "./OrderComponent";

export class OrderItem extends OrderComponent {
  constructor(private name: string, private price: number) {
    super();
  }

  getDescription(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}
