var debug = require('debug')('metalsmith-less')
var each = require('async').each
var multimatch = require('multimatch')
var Parser = require('less').Parser
var join = require('path').join

var DEFAULT_PATTERN = '**/*.less'

module.exports = plugin

function plugin(options) {
    options = options || {}
    var pattern = options.pattern || DEFAULT_PATTERN
    if (typeof options.includePaths === typeof '') options.includePaths = [options.includePaths]
    var includePaths = options.includePaths || []
    var parseOptions = options.parse || { paths: [] }
    var renderOptions = options.render || {}
    return function (files, metalsmith, done) {
        // make include paths absolute
        includePaths = includePaths.map(function (includePath) {
            return join(metalsmith.dir, metalsmith._src, includePath)
        })
        parseOptions.paths += includePaths
        var parser = new Parser(parseOptions)

        var paths = Object.keys(files).filter(function(path){
            debug('checking file: ', path)
            return multimatch(path, pattern).length > 0
        })
        each(paths, convert.bind(null, parser, renderOptions, files), done)
    }
}

function convert(parser, renderOptions, files, path, done) {
    debug('converting file: ', path)
    var data = files[path]
    parser.parse(data.contents.toString(), function(err, tree){
        if (err) return done(err)
        var contents = tree.toCSS(renderOptions)
        var cssPath = path.replace('.less', '.css')
        files[cssPath] = {
            contents: new Buffer(contents)
        }
        delete files[path]
        return done(null)
    })
}

