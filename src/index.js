
/**
 * The default functions which decides if should transform the value.
 * @param {*} value
 * @param {string} key
 */
export function defaultShouldTransform (value) {
    return typeof value !== 'undefined'
}

export function createAddTransformer (shouldTransform, transformers, createTransform) {
    return (prop, transform) => {
        const transformer = {
            prop: prop,
            transform: transform
        };

        const newTransformers = [].concat(transformers, [ transformer ]);

        return createTransform(shouldTransform, newTransformers);
    };
}

function createTransform (shouldTransform = defaultShouldTransform, transformers = []) {
    const transformProperties = function (obj) {
        return transformers.reduce((obj, transformer) => {
            const prop = transformer.prop;
            const transform = transformer.transform;

            // Check if the property should be transformed
            if (!shouldTransform(obj[prop], prop)) {
                return obj;
            }

            const value = obj[prop];
            const newValue = transform(value, { ...obj });

            const objWithNewValue = {};
            objWithNewValue[prop] = newValue;

            // Create new object with new
            return { ...obj, ...objWithNewValue };
        }, { ...obj });
    };

    transformProperties.add = createAddTransformer(shouldTransform, transformers, createTransform);

    // We expose the transformers for tests
    transformProperties._transformers = transformers;

    return transformProperties;
}

export default createTransform;
