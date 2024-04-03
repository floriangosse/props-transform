# props-transform

> Transforms properties of an object by given transform functions.

## Usage

```js
import createTransform from 'props-transform';

const transform = createTransform()
    .add('count', (value) => parseInt(value, 10))
    .add('title', (value) => value.toUpperCase());

const obj = {
    count: '10';
    title: 'my title'
};

transform(obj);
// => { count: 10, title: 'MY TITLE' }
```

## Installation

```js
npm install --save props-transform
```

## License

MIT
