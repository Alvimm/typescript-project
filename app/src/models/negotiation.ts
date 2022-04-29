import { Model } from '../interfaces/model.js';

export class Negotiation implements Model<Negotiation> {
  constructor(
    private _date: Date,
    public quantity: number,
    public value: number
  ) {}

  public static createFrom(
    dateString: string,
    quantityString: string,
    valueString: string
  ): Negotiation {
    const exp = /-/g;
    const date = new Date(dateString.replace(exp, ','));
    const quantity = parseInt(quantityString);
    const value = parseFloat(valueString);
    return new Negotiation(date, quantity, value);
  }

  get volume(): number {
    return this.quantity * this.value;
  }
  get date(): Date {
    const date = new Date(this._date.getTime());
    return date;
  }

  public forText(): string {
    return `
    Date: ${this.date}
    Quantity: ${this.quantity}
    Value: ${this.value}
    `;
  }

  public isEqual(negotiation: Negotiation): boolean {
    return (
      this.date.getDate() === negotiation.date.getDate() &&
      this.date.getMonth() === negotiation.date.getMonth() &&
      this.date.getFullYear() === negotiation.date.getFullYear()
    );
  }
}
