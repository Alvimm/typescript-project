import { domInjector } from '../decorators/domInjector.js';
import { inspect } from '../decorators/inspect.js';
import { logRuntime } from '../decorators/logRuntime.js';
import { DaysOfTheWeek } from '../enums/daysOfTheWeek.js';
import { Negotiation } from '../models/negotiation.js';
import { NegotiationsList } from '../models/negotiationsList.js';
import { NegotiationsService } from '../services/negotiationsService.js';
import { printOut } from '../utils/printOut.js';
import { MessageView } from '../views/messageView.js';
import { NegotiationsView } from '../views/negotiationsView.js';

export class NegotiationController {
  @domInjector('#date')
  private inputDate!: HTMLInputElement;
  @domInjector('#quantity')
  private inputQuantity!: HTMLInputElement;
  @domInjector('#value')
  private inputValue!: HTMLInputElement;
  private negotiations = new NegotiationsList();
  private negotiationsView = new NegotiationsView('#negotiationsView');
  private messageView = new MessageView('#messageView');
  private negotiationsService = new NegotiationsService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @inspect
  @logRuntime()
  public add(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputQuantity.value,
      this.inputValue.value
    );
    if (!this.isBusinessDay(negotiation.date)) {
      this.messageView.update(
        'Negotiations are only accepted on business days'
      );
      this.clearForm();
      return;
    }
    this.negotiations.addNegotiation(negotiation);
    printOut(negotiation, this.negotiations);
    this.clearForm();
    this.updateView();
  }

  public importData(): void {
    this.negotiationsService
      .getDayNegotiations()
      .then((todayNegotiations) =>
        todayNegotiations.filter(
          (todayNegotiation) =>
            !this.negotiations
              .list()
              .some((negotiation) => negotiation.isEqual(todayNegotiation))
        )
      )
      .then((todayNegotiations) => {
        for (let negotiation of todayNegotiations) {
          this.negotiations.addNegotiation(negotiation);
        }
        this.negotiationsView.update(this.negotiations);
      });
  }

  private isBusinessDay(date: Date) {
    return (
      date.getDay() > DaysOfTheWeek.MONDAY &&
      date.getDay() < DaysOfTheWeek.SATURDAY
    );
  }

  private clearForm(): void {
    this.inputDate.value = '';
    this.inputQuantity.value = '1';
    this.inputValue.value = '0.0';
    this.inputDate.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update('Negotiation added successfully');
  }
}
