import { Model } from '../interfaces/model.js';
import { Negotiation } from './negotiation.js';

export class NegotiationsList implements Model<NegotiationsList> {
  private negotiations: Negotiation[] = [];

  public addNegotiation(negotiation: Negotiation) {
    this.negotiations.push(negotiation);
  }

  public list(): readonly Negotiation[] {
    return this.negotiations;
  }

  public forText(): string {
    return JSON.stringify(this.negotiations, null, 2);
  }
  isEqual(negotiations: NegotiationsList): boolean {
    return (
      JSON.stringify(this.negotiations) === JSON.stringify(negotiations.list())
    );
  }
}
