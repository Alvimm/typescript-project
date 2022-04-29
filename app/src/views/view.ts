export abstract class View<T> {
  protected element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector)!;
    if (!this.element)
      throw new Error(`Selector ${selector} doesn't exist in the DOM. Check!`);
  }

  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
