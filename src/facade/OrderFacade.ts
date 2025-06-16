import { Order } from "../state/Order";
import { OrderFactory } from "../factory/OrderFactory";
import { OrderGroup } from "../composite/OrderGroup";
import { OrderItem } from "../composite/OrderItem";
import { StandardProcessing } from "../strategy/StandardProcessing";
import { ExpressProcessing } from "../strategy/ExpressProcessing";
import {ExpressOrderFactory} from "../factory/ExpressOrder";
import {StandardOrderFactory} from "../factory/StandardOrder";

export class OrderFacade {
  private orders: { [id: string]: Order } = {};
  private nextOrderId = 0;

  placeOrder(orderType: string): string {
    const isExpress = orderType === "express";
    const factory: OrderFactory = isExpress
      ? new ExpressOrderFactory()
      : new StandardOrderFactory();
    const order = factory.createOrder((this.nextOrderId++).toString());

    const group = new OrderGroup();
    group.add(new OrderItem("Widget", 100));
    group.add(new OrderItem("Gadget", isExpress ? 200 : 150));
    order.setComponents(group);

    order.setProcessingStrategy(isExpress ? new ExpressProcessing() : new StandardProcessing());

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
      description: `${order.getDescription()}<br>Price: $${order.getTotalPrice()}<br>${order.process()}`
    }));
  }
}
