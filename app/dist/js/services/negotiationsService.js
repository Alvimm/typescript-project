import { Negotiation } from '../models/negotiation.js';
export class NegotiationsService {
    getDayNegotiations() {
        return fetch('http://localhost:8080/data')
            .then((res) => res.json())
            .then((data) => data.map((todayData) => new Negotiation(new Date(), todayData.times, todayData.amount)));
    }
}
//# sourceMappingURL=negotiationsService.js.map