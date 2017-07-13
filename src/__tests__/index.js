/* eslint-env jest */

import createTransform, {
    defaultShouldTransform,
    createAddTransformer
} from '../';

test('defaultShouldTransform', () => {
    expect(defaultShouldTransform(undefined)).toBe(false);

    expect(defaultShouldTransform(null)).toBe(true);
    expect(defaultShouldTransform(0)).toBe(true);
    expect(defaultShouldTransform(-1)).toBe(true);
    expect(defaultShouldTransform('string')).toBe(true);
});

describe('createTransform', () => {
    const transform = createTransform();

    expect(typeof transform).toBe('function');
    expect(typeof transform.add).toBe('function');
});

test('createAddTransformer', () => {
    const shouldTransform = () => true;
    const transformers = [];

    const add = createAddTransformer(shouldTransform, transformers, createTransform);

    expect(typeof add).toBe('function');
});

describe('transform', () => {
    test('transforms object', () => {
        const actual = { count: '10' };
        const expected = { count: 10 };

        const transform = createTransform()
            .add('count', (value) => parseInt(value, 10));

        expect(transform(actual)).toEqual(expected);
    });

    test('ignores object without transformer', () => {
        const actual = { title: 'The title', count: '10' };
        const expected = { title: 'The title', count: 10 };

        const transform = createTransform()
            .add('count', (value) => parseInt(value, 10));

        expect(transform(actual)).toEqual(expected);
    });

    test('respects shouldTransform', () => {
        const actual = { title: 'The title', count: '10' };
        const expected = { title: 'The title', count: 10 };


        const shouldTransform = (value, key) => {
            return key !== 'title'
        };

        const transform = createTransform(shouldTransform)
            .add('count', (value) => parseInt(value, 10))
            .add('title', (value) => title.toUpperCase());

        expect(transform(actual)).toEqual(expected);
    });
});

describe('add', () => {
    test('creates new transform instance', () => {
        const shouldTransform = () => true;
        const transformers = [];
        const createTransformMock = jest.fn(createTransform);

        const add = createAddTransformer(shouldTransform, transformers, createTransformMock);


        const transform = add('count', (value) => parseInt(value, 10));

        expect(typeof transform).toBe('function');
        expect(createTransformMock).toHaveBeenCalledTimes(1);
    });

    test('extends existing instance', () => {
        const simpleTransform = createTransform()
            .add('count', (value) => parseInt(value, 10));

        const extendedTransform = simpleTransform
            .add('title', (value) => title.toUpperCase());

        expect(extendedTransform).not.toBe(simpleTransform);
        expect(extendedTransform._transformers).toHaveLength(simpleTransform._transformers.length + 1);
    });
})
