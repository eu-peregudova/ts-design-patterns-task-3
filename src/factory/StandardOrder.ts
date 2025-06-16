import { Order } from "../state/Order";
import { OrderFactory } from "./OrderFactory";

export class StandardOrderFactory extends OrderFactory {
  createOrder(id: string): Order {
    return new Order(id);
  }
}
