import { OrderComponent } from "./OrderComponent";

export class OrderGroup extends OrderComponent {
  private components: OrderComponent[] = [];

  add(component: OrderComponent) {
    this.components.push(component);
  }

  getDescription(): string {
    return this.components.map(c => c.getDescription()).join(", ");
  }

  getPrice(): number {
    return this.components.reduce((sum, c) => sum + c.getPrice(), 0);
  }
}
