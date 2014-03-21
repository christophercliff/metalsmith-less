var async = require('async')
var Parser = require('less').Parser

module.exports = plugin

function plugin(options) {
    options = options || {}
    var parser = new Parser(options.parse || {})
    return function (files, metalsmith, done) {
        var paths
        try {
            paths = Object.keys(files).filter(options.filter || filter)
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
            contents = tree.toCSS(options.render || {})
            files[(options.mapPath || mapPath)(path, contents)] = {
                contents: new Buffer(contents)
            }
            // Consume the file that was just compiled
            delete files[path];
        } catch (ex) {
            return done(ex)
        }
        return done(null)
    })
}

function filter(path) {
    return /\.less$/.test(path)
}

function mapPath(path, contents) {
    return path.replace(/less/g, 'css')
}
