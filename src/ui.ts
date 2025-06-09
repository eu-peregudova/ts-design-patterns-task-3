import { OrderFacade } from "./facade/OrderFacade";

export class UI {
  private facade: OrderFacade;
  private ordersList: HTMLElement;

  constructor(facade: OrderFacade) {
    this.facade = facade;
    this.ordersList = document.getElementById("orders-list")!;
    this.init();
  }

  init() {
    document.getElementById("place-order-btn")!.addEventListener("click", () => {
      const orderId = this.facade.placeOrder();
      this.render();
    });
    this.render();
  }

  render() {
    this.ordersList.innerHTML = "";

    const orders = this.facade.getAllOrders();
    if (orders.length === 0) {
      this.ordersList.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    orders.forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";

      const info = document.createElement("div");
      info.className = "order-info";
      info.innerHTML = `
                <strong>Order #${order.id}</strong><br>
                Status: ${order.status}<br>
                Description: ${order.description}
            `;

      const actions = document.createElement("div");
      actions.className = "order-actions";
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next Step";
      nextBtn.disabled = order.status === "Shipped";
      nextBtn.addEventListener("click", () => {
        this.facade.advanceOrder(order.id);
        this.render();
      });

      actions.appendChild(nextBtn);
      card.appendChild(info);
      card.appendChild(actions);

      this.ordersList.appendChild(card);
    });
  }
}
