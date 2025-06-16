import { OrderProcessingStrategy } from "./OrderProcessingStrategy";

export class ExpressProcessing implements OrderProcessingStrategy {
  process(orderId: string): string {
    return `Order ${orderId} processed with express strategy.`;
  }
}
