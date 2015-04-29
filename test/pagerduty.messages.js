var args = require('./fixtures/args.json');
var oncall = require('./fixtures/oncall.json');
var target = require('./../plugins/pagerduty/messages.js');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Pagerduty plugin',function(){
  describe('Messages',function(){
    describe('#oncall',function(){
      it('should return a formatted slack message',function(done){
        var message = target.oncall(args,oncall);
        message.should.be.ok;
        message.should.have.property('text')
        .be.equal('The following persons are on call.');
      message.should.have.property('channel')
        .be.equal('C4321');
      message.should.have.property('username')
        .be.equal('pagerduty');
      message.should.have.property('icon_emoji')
        .be.equal(':rotating_light:');
      message.should.have.property('attachments')
        .with.length(3);
      done();
      });
      it('should return a formatted slack message for single level',function(done){
        var message = target.oncall(args,[oncall[0]]);
        message.should.be.ok;
        message.should.have.property('text')
          .be.equal('The following person is on call.');
        message.should.have.property('channel')
          .be.equal('C4321');
        done();
      })
      it('should throw an error if no slack arguments are provided.',function(done){
        (function(){target.oncall(null,oncall);}).should
          .throw(Error);
        done();
      });
      it('should throw an error if no oncall data is provided.',function(done){
        (function(){target.oncall(args,null);})
          .should.throw(Error);
        done();
      });
    });
  });
});
