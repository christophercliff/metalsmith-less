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

})
