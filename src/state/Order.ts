import { OrderState } from "./OrderState";
import { NewState } from "./NewState";

export class Order {
  private state: OrderState;
  public id: string;

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
}
