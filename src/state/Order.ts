import { OrderState } from "./OrderState";
import { NewState } from "./NewState";
import { OrderComponent } from "../composite/OrderComponent";
import { OrderProcessingStrategy } from "../strategy/OrderProcessingStrategy";

export class Order {
  private state: OrderState;
  public id: string;
  private components: OrderComponent | null = null;
  private processingStrategy: OrderProcessingStrategy | null = null;

  constructor(id: string) {
    this.id = id;
    this.state = new NewState();
  }

  setState(state: OrderState) {
    this.state = state;
  }

  nextState() {
    this.state.next(this);
  }

  getStatus(): string {
    return this.state.getStatus();
  }

  getStateName(): string {
    return this.state.name;
  }

  setComponents(components: OrderComponent) {
    this.components = components;
  }

  getDescription(): string {
    return this.components ? this.components.getDescription() : "No items";
  }

  getTotalPrice(): number {
    return this.components ? this.components.getPrice() : 0;
  }

  setProcessingStrategy(strategy: OrderProcessingStrategy) {
    this.processingStrategy = strategy;
  }

  process(): string {
    if (!this.processingStrategy) {
      return "No processing strategy set.";
    }
    return this.processingStrategy.process(this.id);
  }
}
