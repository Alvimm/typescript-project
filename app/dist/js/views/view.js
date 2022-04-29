export class View {
    constructor(selector) {
        this.element = document.querySelector(selector);
        if (!this.element)
            throw new Error(`Selector ${selector} doesn't exist in the DOM. Check!`);
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
//# sourceMappingURL=view.js.map