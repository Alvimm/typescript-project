export function escape(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let returN = originalMethod.apply(this, args);
        if (typeof returN === 'string') {
            returN = returN.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return returN;
    };
    return descriptor;
}
//# sourceMappingURL=escape.js.map