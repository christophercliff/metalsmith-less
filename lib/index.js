var async = require('async')
var Parser = require('less').Parser

module.exports = plugin

function plugin(options) {
    options = options || {}
    var parser = new Parser(options.parse || {})
    return function (files, metalsmith, done) {
        async.each(Object.keys(files).filter(options.filter || all), convert.bind(null, parser, options, files), done)
    }
}

function convert(parser, options, files, path, done) {
    var data = files[path]
    parser.parse(data.contents.toString(), function(err, tree){
        if (err) return done(err)
        files[(options.mapPath || mapPath)(path)] = {
            contents: new Buffer(tree.toCSS(options.render || {}))
        }
        return done(null)
    })
}

function all(path) {
    return /\.less$/.test(path)
}

function mapPath(path) {
    return path.replace(/less/g, 'css')
}
