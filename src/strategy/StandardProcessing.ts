import { OrderProcessingStrategy } from "./OrderProcessingStrategy";

export class StandardProcessing implements OrderProcessingStrategy {
  process(orderId: string): string {
    return `Order ${orderId} processed with standard strategy.`;
  }
}
