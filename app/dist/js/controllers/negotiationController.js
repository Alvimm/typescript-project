var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negotiations = new NegotiationsList();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.negotiationsService = new NegotiationsService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.isBusinessDay(negotiation.date)) {
            this.messageView.update('Negotiations are only accepted on business days');
            this.clearForm();
            return;
        }
        this.negotiations.addNegotiation(negotiation);
        printOut(negotiation, this.negotiations);
        this.clearForm();
        this.updateView();
    }
    importData() {
        this.negotiationsService
            .getDayNegotiations()
            .then((todayNegotiations) => todayNegotiations.filter((todayNegotiation) => !this.negotiations
            .list()
            .some((negotiation) => negotiation.isEqual(todayNegotiation))))
            .then((todayNegotiations) => {
            for (let negotiation of todayNegotiations) {
                this.negotiations.addNegotiation(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    isBusinessDay(date) {
        return (date.getDay() > DaysOfTheWeek.MONDAY &&
            date.getDay() < DaysOfTheWeek.SATURDAY);
    }
    clearForm() {
        this.inputDate.value = '';
        this.inputQuantity.value = '1';
        this.inputValue.value = '0.0';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negotiation added successfully');
    }
}
__decorate([
    domInjector('#date')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantity')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInjector('#value')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect,
    logRuntime()
], NegotiationController.prototype, "add", null);
//# sourceMappingURL=negotiationController.js.map