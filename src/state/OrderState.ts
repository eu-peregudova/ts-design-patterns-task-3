import { Order } from "./Order";

export interface OrderState {
  name: string;
  next(order: Order): void;
  getStatus(): string;
}
