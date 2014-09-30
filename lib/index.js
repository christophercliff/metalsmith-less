var _ = require('lodash')
var async = require('async')
var multimatch = require('multimatch')
var Parser = require('less').Parser
var path = require('path')

var DEFAULT_PATTERN = '**/*.less'
var MAP_RE = /less/g
var INPUT = 'input'

module.exports = plugin

function plugin(options) {
    options = options || {}
    var pattern = options.pattern || DEFAULT_PATTERN
    var useDefaultSourceMap = options.useDefaultSourceMap || false
    var parseOptions = options.parse || {}
    var renderOptions = options.render || {}
    var parser = new Parser(parseOptions)
    return function (files, metalsmith, done) {
        var paths = Object.keys(files).filter(function(path){
            return multimatch(path, pattern).length > 0
        })
        async.each(paths, convert.bind(null, parser, useDefaultSourceMap, renderOptions, files), done)
    }
}

function convert(parser, useDefaultSourceMap, renderOptions, files, filePath, done) {
    var data = files[filePath]
    parser.parse(data.contents.toString(), function(err, tree){
        if (err) return done(err)
        var destination = map(filePath)
        var sourceMapDestination
        var sourceMap
        var contents
        if (useDefaultSourceMap) {
            sourceMapDestination = destination + '.map'
            renderOptions = _.chain(renderOptions)
                .clone()
                .extend({
                    outputSourceFiles: true,
                    sourceMap: true,
                    sourceMapBasepath: undefined,
                    sourceMapFilename: undefined,
                    sourceMapOutputFilename: undefined,
                    sourceMapURL: path.basename(sourceMapDestination),
                    writeSourceMap: function (res) {
                        var sm = JSON.parse(res)
                        var inputIndex = sm.sources.indexOf(INPUT)
                        if (inputIndex) sm.sources[inputIndex] = 'src/' + filePath
                        sourceMap = JSON.stringify(sm)
                    }
                })
                .value()
        }
        contents = tree.toCSS(renderOptions)
        if (useDefaultSourceMap) {
            files[sourceMapDestination] = {
                contents: new Buffer(sourceMap)
            }
        }
        files[destination] = {
            contents: new Buffer(contents)
        }
        return done(null)
    })
}

function map(filePath) {
    return filePath.replace(MAP_RE, 'css')
}
