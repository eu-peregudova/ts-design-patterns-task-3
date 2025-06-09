import { Order } from "../state/Order";

export class OrderFacade {
  private orders: { [id: string]: Order } = {};
  private nextOrderId = 0;

  placeOrder(): string {
    const order = new Order((this.nextOrderId++).toString());
    this.orders[order.id] = order;
    return order.id;
  }

  advanceOrder(orderId: string): void {
    const order = this.orders[orderId];
    if (!order) return;
    order.nextState();
  }

  getOrderStatus(orderId: string): string {
    const order = this.orders[orderId];
    if (!order) return "Order not found.";
    return order.getStatus();
  }

  getAllOrders(): { id: string, status: string, description: string }[] {
    return Object.values(this.orders).map(order => ({
      id: order.id,
      status: order.getStateName(),
      description: order.getStatus()
    }));
  }
}
