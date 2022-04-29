export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let returN = originalMethod.apply(this, args);
    if (typeof returN === 'string') {
      // console.log(
      //   `@escape in action in the class ${this.constructor.name} for method ${propertyKey}`
      // );
      returN = returN.replace(/<script>[\s\S]*?<\/script>/, '');
    }

    return returN;
  };
  return descriptor;
}
