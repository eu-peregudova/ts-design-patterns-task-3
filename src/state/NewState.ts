import { OrderState } from "./OrderState";
import { Order } from "./Order";
import { ProcessingState } from "./ProcessingState";

export class NewState implements OrderState {
  name = "New";

  next(order: Order): void {
    order.setState(new ProcessingState());
  }

  getStatus(): string {
    return "Order is new and awaiting processing.";
  }
}
