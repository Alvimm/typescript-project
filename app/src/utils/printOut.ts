import { Printable } from '../interfaces/printable.js';

export function printOut(...objects: Printable[]) {
  for (let object of objects) {
    console.log(object.forText());
  }
}
