export function domInjector(selector: string) {
  return function (target: any, propertyKey: string) {
    console.log(
      `Modifying prototype ${target.constructor.name} and adding getter for property ${propertyKey}`
    );
    let element: HTMLElement;
    const getter = function () {
      if (!element) {
        element = document.querySelector(selector)!;
        console.log(
          `Searching element from DOM with selector ${selector} to inject into ${propertyKey}`
        );
      }
      return element;
    };

    Object.defineProperty(target, propertyKey, { get: getter });
  };
}
