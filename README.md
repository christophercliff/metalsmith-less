# metalsmith-less

## Installation

```
npm install metalsmith-less
```

## Usage

### JavaScript

```js
var less = require('metalsmith-less')

Metalsmith(__dirname)
    .use(less(options))
    .build()
```

### Options

Use any or all of the following:

#### `filter`

A function to filter source files. By default, includes all `.less` files. Use this to filter out [`@import`][1] files.

#### `mapPath`

A Function that maps source paths to build paths. By default, maps `less/your-file.less` to `css/your-file.css`.

#### `parse`

An object that gets passed along to [`new less.Parser(options)`][2].

#### `render`

An object that gets passed along to [`tree.toCSS(options)`][2].

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-less/blob/master/LICENSE.md) for details.

[1]: http://lesscss.org/features/#features-overview-feature-importing
[2]: https://github.com/less/less.js/
