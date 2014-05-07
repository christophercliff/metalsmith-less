var assert = require('assert')
var assertDir = require('assert-dir-equal')
var less = require('../')
var Metalsmith = require('metalsmith')

describe('metalsmith-less', function(){

    it('should convert less to css', function(done){
        Metalsmith('test/fixtures/basic')
            .use(less())
            .build(function(err){
                if (err) return done(err)
                assertDir('test/fixtures/basic/expected', 'test/fixtures/basic/build')
                return done(null)
        })
    })

    it('should convert imported files', function(done){
        Metalsmith('test/fixtures/import')
            .use(less({
                pattern: 'less/index.less',
                parse: {
                    paths: ['test/fixtures/import/src/less']
                }
            }))
            .build(function(err){
                if (err) return done(err)
                assertDir('test/fixtures/import/expected', 'test/fixtures/import/build')
                return done(null)
        })
    })

    it('should not mangle paths with `less` in them', function(done) {
        Metalsmith('test/fixtures/less-paths')
            .use(less())
            .build(function(err, files) {
                if (err) return done(err)
                assert(files['dauntless/styles.css'], 'folder with less in its name kept its name')
                assert(files['stuff/less/styles.css'], 'folder named less kept its name')
                return done()
            })
    })
})
