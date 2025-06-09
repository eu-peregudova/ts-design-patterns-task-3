import { OrderState } from "./OrderState";
import { Order } from "./Order";
import { ShippedState } from "./ShippedState";

export class ProcessingState implements OrderState {
  name = "Processing";

  next(order: Order): void {
    order.setState(new ShippedState());
  }

  getStatus(): string {
    return "Order is being processed.";
  }
}
