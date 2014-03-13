# metalsmith-less

## Installation

```
npm install metalsmith-less
```

## Usage

### CLI

Soon

### JavaScript

```js
var less = require('metalsmith-less')

Metalsmith(__dirname)
    .use(less(options))
    .build()
```

#### Options

Under the hood, this plugin is using [node-sass](https://github.com/andrew/node-sass), and there are
few options you can pass through to it:

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-less/blob/master/LICENSE.md) for details.
