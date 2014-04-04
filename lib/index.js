var async = require('async')
var multimatch = require('multimatch')
var Parser = require('less').Parser

var DEFAULT_PATTERN = '**/*.less'
var MAP_RE = /less/g

module.exports = plugin

function plugin(options) {
    options = options || {}
    var pattern = options.pattern || DEFAULT_PATTERN
    var parseOptions = options.parse || null
    var renderOptions = options.render || null
    var parser = new Parser(parseOptions)
    return function (files, metalsmith, done) {
        var paths = Object.keys(files).filter(function(path){
            return multimatch(path, pattern).length > 0
        })
        async.each(paths, convert.bind(null, parser, renderOptions, files), done)
    }
}

function convert(parser, renderOptions, files, path, done) {
    var data = files[path]
    parser.parse(data.contents.toString(), function(err, tree){
        if (err) return done(err)
        var contents = tree.toCSS(renderOptions)
        files[map(path)] = {
            contents: new Buffer(contents)
        }
        return done(null)
    })
}

function map(path) {
    return path.replace(MAP_RE, 'css')
}
