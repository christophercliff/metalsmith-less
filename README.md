# metalsmith-less

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Slack chat][slack-badge]][slack-url]


A [LESS](http://lesscss.org/) plugin for [Metalsmith](http://www.metalsmith.io/).

## Installation

```
npm install metalsmith-less
```

## Usage

```js
var less = require('metalsmith-less')

new Metalsmith(__dirname)
    .use(less(options))
    .build()
```

### **`options`** `Object`

- **`pattern`** `String|Array<String>`

    The [pattern](https://github.com/sindresorhus/multimatch) to filter source files. Default `**/*.less`.

- **`render`** `Object`

    The options passed to [`less.render(String[, Object])`](http://lesscss.org/usage/#programmatic-usage). Unfortunately, this method is *undocumented*. See https://github.com/less/less-docs/issues/212 for more information. Default `undefined`.

- **`useDynamicSourceMap`** `Boolean`

    Overrides the supplied source map configuration with a dynamic file-level configuration. This is the easiest way to enable source maps in your Metalsmith build. Default `false`.

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-less/blob/master/LICENSE.md) for details.

[npm-badge]: https://img.shields.io/npm/v/metalsmith-less.svg
[npm-url]: https://npmjs.com/package/metalsmith-less
[travis-badge]: https://travis-ci.org/christophercliff/metalsmith-less.svg?branch=master
[travis-url]: https://travis-ci.org/christophercliff/metalsmith-less
[coveralls-badge]:https://coveralls.io/repos/christophercliff/metalsmith-less/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/christophercliff/metalsmith-less?branch=master
[david-badge]: https://david-dm.org/christophercliff/metalsmith-less.svg
[david-url]: https://david-dm.org/christophercliff/metalsmith-less
[slack-badge]: https://img.shields.io/badge/Slack-Join%20Chat%20→-blue.svg
[slack-url]: http://metalsmith-slack.herokuapp.com/
