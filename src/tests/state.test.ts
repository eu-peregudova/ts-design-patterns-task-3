import { Order } from "../state/Order";

describe("Order State Pattern", () => {
  it("should start in New state", () => {
    const order = new Order('1');
    expect(order.getStateName()).toBe("New");
    expect(order.getStatus()).toBe("Order is new and awaiting processing.");
  });

  it("should transition from New -> Processing -> Shipped", () => {
    const order = new Order('2');
    order.nextState();
    expect(order.getStateName()).toBe("Processing");
    expect(order.getStatus()).toBe("Order is being processed.");

    order.nextState();
    expect(order.getStateName()).toBe("Shipped");
    expect(order.getStatus()).toBe("Order has been shipped.");
  });

  it("should not advance beyond Shipped", () => {
    const order = new Order('3');
    order.nextState();
    order.nextState();
    order.nextState();
    expect(order.getStateName()).toBe("Shipped");
  });
});
