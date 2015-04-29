var request = require('supertest');
var req = require('request');
process.env.PLUGINS_PATH = '../test/fixtures/plugins';
process.env.SLACK_HOOK = 'http://127.0.0.1';
var app = require('../app.js');

describe('Slang app',function(){
  describe('GET /',function(done){
    it('should return 204 status code',function(done){
      request(app)
      .get('/')
      .expect(204, done);
    });
  });
  describe('POST /slash/commands',function(done){
    var postCount = 0;

    beforeEach(function(done){
      postCount = 0;
      req.post = function(data,callback) {
        postCount += 1;
        callback(null,{statusCode:200},{});
      };
      done();
    });

    it('should return 204 status code for a valid payload',function(done){
     request(app)
      .post('/slash/commands')
      .type('form')
      .send({token: 'DEADFEED'})
      .send({team_id : 'T0001'})
      .send({channel_id : 'C2147483705'})
      .send({channel_name : 'test'})
      .send({user_id : 'U2147483697'})
      .send({user_name : 'Lucas'})
      .send({command : '/foo'})
      .send({text : ''})
      .expect(204, done); 
    });

    it('should not post to slackHook if plugin returns no message.',function(done){
     request(app)
      .post('/slash/commands')
      .type('form')
      .send({token: 'DEADFEED'})
      .send({team_id : 'T0001'})
      .send({channel_id : 'C2147483705'})
      .send({channel_name : 'test'})
      .send({user_id : 'U2147483697'})
      .send({user_name : 'Lucas'})
      .send({command : '/bar'})
      .send({text : ''})
      .expect(204)
      .end(function(err,res){
        if (err) return done(err);
        postCount.should.be.equal(0);
        return done();
      }); 
    });

    it('should respond with 500 if no request body sent.',function(done){
      request(app)
        .post('/slash/commands')
        .type('form')
        .expect(500,done);
    });
  });
});
