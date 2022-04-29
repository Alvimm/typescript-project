import { DayNegotiations } from '../interfaces/dayNegotiation.js';
import { Negotiation } from '../models/negotiation.js';

export class NegotiationsService {
  public getDayNegotiations(): Promise<Negotiation[]> {
    return fetch('http://localhost:8080/data')
      .then((res) => res.json())
      .then((data: DayNegotiations[]) =>
        data.map(
          (todayData) =>
            new Negotiation(new Date(), todayData.times, todayData.amount)
        )
      );
  }
}
