# metalsmith-less

A [LESS][less] plugin for [Metalsmith][metalsmith].

[![Build Status](https://secure.travis-ci.org/christophercliff/metalsmith-less.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-less)

## Installation

```
npm install metalsmith-less
```

## Usage

```js
var less = require('metalsmith-less')

Metalsmith(__dirname)
  .use(less(options))
  .build()
```

### Options

Use any or all of the following:

#### `filter`

A function to filter source files. By [default][default filter], includes all `.less` files. Use this to filter out [`@import`][less @import] files.

#### `mapPath`

A function that maps source paths to build paths. By [default][default mapPath], maps `less/your-file.less` to `css/your-file.css`.

#### `parse`

An object that gets passed along to [`new less.Parser(options)`][less source].

#### `render`

An object that gets passed along to [`tree.toCSS(options)`][less source].

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-less/blob/master/LICENSE.md) for details.

[less]: http://lesscss.org/
[less @import]: http://lesscss.org/features/#features-overview-feature-importing
[less source]: https://github.com/less/less.js/
[metalsmith]: http://www.metalsmith.io/
[default filter]: https://github.com/christophercliff/metalsmith-less/blob/master/lib/index.js#L38-L40
[default mapPath]: https://github.com/christophercliff/metalsmith-less/blob/master/lib/index.js#L42-L44
