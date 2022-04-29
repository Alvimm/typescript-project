export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`--- Method: ${propertyKey}`);
    console.log(`------ Parameter: ${JSON.stringify(args)}`);

    const returN = originalMethod.apply(this, args);
    console.log(`------ Return: ${JSON.stringify(returN)}`);
    return returN;
  };

  return descriptor;
}
