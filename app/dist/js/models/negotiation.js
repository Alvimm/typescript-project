export class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    static createFrom(dateString, quantityString, valueString) {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negotiation(date, quantity, value);
    }
    get volume() {
        return this.quantity * this.value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    forText() {
        return `
    Date: ${this.date}
    Quantity: ${this.quantity}
    Value: ${this.value}
    `;
    }
    isEqual(negotiation) {
        return (this.date.getDate() === negotiation.date.getDate() &&
            this.date.getMonth() === negotiation.date.getMonth() &&
            this.date.getFullYear() === negotiation.date.getFullYear());
    }
}
//# sourceMappingURL=negotiation.js.map