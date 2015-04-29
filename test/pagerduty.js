var request = require('request')
  , should = require('chai').should()
  , oncallData = require('./fixtures/pagerduty_oncall.json')
  , target = require('./../plugins/pagerduty/pagerduty.js');

describe('Pagerduty plugin',function(){
  describe('Pagerduty',function(){
    describe('#oncall',function(){

      var options = null;
      var error = null;
      var data = null;

      beforeEach(function(done){
        data = {};
        error = null;
        request.get = function(opts, callback) {
          options = opts;
          return (callback(error, {statusCode:200}, data));
        };
        done();
      });

      it('should callback with error if no escalation policy data is returned.',function(done){
        error = new Error('test error');
        target.oncall({},function(err, persons){
          err.should.be.ok;
          done();
        });
      });

      it('should callback with array of length 3 if no level specified.',function(done){
        data = oncallData;
        target.oncall({},function(err, persons){
          persons.should.be.ok;
          persons.should.have.length(3);
          done();
        });
      });

      it('should callback with array of length 1 if level is specified.',function(done){
        data = oncallData;
        target.oncall({level:1},function(err, persons){
          persons.should.be.ok;
          persons.should.have.length(1);
          done();
        });
      });
    });
  });
});
