import { Order } from "../state/Order";

export abstract class OrderFactory {
  abstract createOrder(id: string): Order;
}
