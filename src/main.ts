import { OrderFacade } from "./facade/OrderFacade";
import { UI } from "./ui";

const facade = new OrderFacade();
window.addEventListener("DOMContentLoaded", () => {
  new UI(facade);
});
