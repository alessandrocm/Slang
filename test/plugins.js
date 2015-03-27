var plugins = require('./../plugins/plugins.js')
  , should = require('chai').should()
  , slack = require('./../lib/slack')
  , paylod = require('./fixtures/payload.json');

describe('Plugins',function(){
  
  var testDir = '../test/fixtures/plugins';

  describe('#load',function(){
    
    it('should return a plugin runner object',function(done){
      var opts = { dir : testDir };
      var target = plugins.load(opts);
      target.should.have.property('run');
      done();
    });

  });

  describe('#run',function(){

    var request = new slack.Request(paylod);

    it('should run plugin that matches slack command',function(done){
      var opts = { dir : testDir };
      var target = plugins.load(opts);
      target.run(request,function(err, message){
        should.not.exist(err);
        message.should.be.ok;
        message.should.equal("OK");
        done();
      });
    });

    it('should callback with error if no method matches the slack command',function(done){
      var opts = { dir : testDir };
      var target = plugins.load(opts);
      request.command = '/bar';
      target.run(request,function(err,message){
        err.should.be.ok;
        done();
      });
    });
  });
});
