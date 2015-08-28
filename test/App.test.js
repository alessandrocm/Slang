"use strict";

var request = require('supertest');
var app = require('./../app');

describe('App',function(){
	it('should return 204 respones for GET /',function(done){
		request(app)
			.get('/')
			.expect(204,done);
	});
	it('should return 400 responses for invalid POST /command',function(done){
		request(app)
			.post('/command')
			.type('form')
			.expect(400,done);
	});
	it('should return 204 responses for valid POST /command',function(done){
		request(app)
			.post('/command')
			.type('form')
			.send('command=/test')
			.send('token=gIkuvaNzQIHg97ATvDxqgjtO')
			.send('team_id=T0001')
			.send('team_domain=example')
			.send('channel_id=C2147483705')
			.send('channel_name=test')
			.send('user_id=U2147483697')
			.send('user_name=Slevin')
			.send('command=/weather')
			.send('text=94070')
			.expect(204,done);
	});
});