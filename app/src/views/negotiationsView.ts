import { escape } from '../decorators/escape.js';
import { NegotiationsList } from '../models/negotiationsList.js';
import { View } from './view.js';

export class NegotiationsView extends View<NegotiationsList> {
  @escape
  protected template(model: NegotiationsList): string {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATE</th>
            <th>QUANTITY</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          ${model
            .list()
            .map((neg) => {
              return `
              <tr>
                <td>${this.formatDate(neg.date)}</td>
                <td>${neg.quantity}</td>
                <td>${neg.value}</td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-br').format(date);
  }
}
