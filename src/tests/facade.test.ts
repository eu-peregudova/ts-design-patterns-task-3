import { OrderFacade } from "../facade/OrderFacade";

describe("OrderFacade", () => {
  let facade: OrderFacade;

  beforeEach(() => {
    facade = new OrderFacade();
  });

  it("should place a new order and return its id", () => {
    const id = facade.placeOrder();
    expect(typeof id).toBe("string");
    expect(facade.getOrderStatus(id)).toBe("Order is new and awaiting processing.");
  });

  it("should advance order state", () => {
    const id = facade.placeOrder();
    facade.advanceOrder(id);
    expect(facade.getOrderStatus(id)).toBe("Order is being processed.");
    facade.advanceOrder(id);
    expect(facade.getOrderStatus(id)).toBe("Order has been shipped.");
  });

  it("should not advance non-existent order", () => {
    expect(facade.getOrderStatus('999')).toBe("Order not found.");
    facade.advanceOrder('999');
  });

  it("should list all orders", () => {
    const id1 = facade.placeOrder();
    const id2 = facade.placeOrder();
    const orders = facade.getAllOrders();
    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe(id1);
    expect(orders[1].id).toBe(id2);
  });
});
