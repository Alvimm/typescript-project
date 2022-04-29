export function inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Method: ${propertyKey}`);
        console.log(`------ Parameter: ${JSON.stringify(args)}`);
        const returN = originalMethod.apply(this, args);
        console.log(`------ Return: ${JSON.stringify(returN)}`);
        return returN;
    };
    return descriptor;
}
//# sourceMappingURL=inspect.js.map