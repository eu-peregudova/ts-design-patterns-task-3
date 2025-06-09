import { OrderState } from "./OrderState";
import { Order } from "./Order";

export class ShippedState implements OrderState {
  name = "Shipped";

  next(order: Order): void {
    return
  }

  getStatus(): string {
    return "Order has been shipped.";
  }
}
