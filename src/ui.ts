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
      const typeSelect = document.getElementById("order-type") as HTMLSelectElement;
      const orderType = typeSelect.value;
      const orderId = this.facade.placeOrder(orderType);
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
        <span>Status: ${order.status}</span><br>
        <span>${order.description}</span>
      `;
      card.appendChild(info);

      // Advance state button
      const btn = document.createElement("button");
      btn.textContent = "Advance State";
      btn.onclick = () => {
        this.facade.advanceOrder(order.id);
        this.render();
      };
      card.appendChild(btn);

      this.ordersList.appendChild(card);
    });
  }
}
