var request = require('request')
  , should = require('chai').should()
  , SlackHook = require('./../lib/slack').Hook;

describe('SlackHook',function(){
  
  describe('#constructor',function(){

    it('should return an object of type SlackHook',function(done){
      var opts = { url : 'https://test.slack.url/hook' };
      var target = new SlackHook(opts);
      target.should.be.an.instanceof(SlackHook);
      done();
    });

    it('should throw "Hook url is required" error.',function(done){
      (function(){new SlackHook()}).should.throw(Error,'Hook url is required');
      done();
    });
    
  });

  describe('#send', function() {

    var options = null
    , response = null
    , error = null;
    
    beforeEach(function(){
      error = null;
      response = { statusCode : 200 };
      options = null;
      request.post = function(opts,callback) {
        options = opts;
        return (callback(error,response));
      };
    });

   it('should contain form data',function(done) {
     var target = new SlackHook({ url : 'https://test.slack.url/hook' });
     target.send({},function(err) {
       options.should.have.property('form');
       done();
     });
   }); 

   it('should contain a url property',function(done){
    var opts = { url : 'https://test.slack.url/hook' };
    var target = new SlackHook(opts);
    target.send({},function(err) {
      options.should.have.property('url')
        .to.be.equal(opts.url);
      done();
    });
   });

   it('should callback with error when response.statusCode is not 200', function(done){
     var opts = { url : 'https://test.slack.url/hook' };
     error = new Error('internal server error');
     response.statusCode = 500;
     var target = new SlackHook(opts);
     target.send({},function(err){
       err.should.be.ok;
       done();
     });
   });

  });
});
