var async = require('async')
var multimatch = require('multimatch')
var Parser = require('less').Parser

var DEFAULT_PATTERN = '**/*.less'

module.exports = plugin

function plugin(options) {
    options = options || {}
    var parser = new Parser(options.parse || null)
    return function (files, metalsmith, done) {
        var paths
        try {
            paths = Object.keys(files).filter(function(path){
                return multimatch(path, options.pattern || DEFAULT_PATTERN).length > 0
            })
        } catch (ex) {
            return done(ex)
        }
        async.each(paths, convert.bind(null, parser, options, files), done)
    }
}

function convert(parser, options, files, path, done) {
    var data = files[path]
    if (!data || !data.contents) return done(new Error('data does not exist'))
    parser.parse(data.contents.toString(), function(err, tree){
        if (err) return done(err)
        var contents
        try {
            contents = tree.toCSS(options.render || null)
            files[map(path)] = {
                contents: new Buffer(contents)
            }
        } catch (ex) {
            return done(ex)
        }
        return done(null)
    })
}

function map(path) {
    return path.replace(/less/g, 'css')
}
