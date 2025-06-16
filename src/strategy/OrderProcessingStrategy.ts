export interface OrderProcessingStrategy {
  process(orderId: string): string;
}
