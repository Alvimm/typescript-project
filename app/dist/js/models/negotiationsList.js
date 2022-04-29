export class NegotiationsList {
    constructor() {
        this.negotiations = [];
    }
    addNegotiation(negotiation) {
        this.negotiations.push(negotiation);
    }
    list() {
        return this.negotiations;
    }
    forText() {
        return JSON.stringify(this.negotiations, null, 2);
    }
    isEqual(negotiations) {
        return (JSON.stringify(this.negotiations) === JSON.stringify(negotiations.list()));
    }
}
//# sourceMappingURL=negotiationsList.js.map