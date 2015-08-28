/* global describe, beforeEach, it */
"use strict";

var expect = require('chai').expect,
	assert = require('chai').assert,
	slang = require('./../lib/slang');

describe('Slang',function(){
	describe('#use',function(){
		it('should throw error if command is null',function(done){
			expect(function(){
				slang.use(null,function(){});
			}).to.throw('command cannot be null or undefined');
			done();
		});
		it('should throw error if command is undefined',function(done){
			expect(function(){
				slang.use(undefined,function(){});
			}).to.throw('command cannot be null or undefined');
			done();
		});
		it('should throw error if listener is null',function(done){
			expect(function(){
				slang.use('command',null);
			}).to.throw('plugin cannot be null or undefined');
			done();
		});
		it('should throw error if listener is undefined',function(done){
			expect(function(){
				slang.use('command',undefined);
			}).to.throw('plugin cannot be null or undefined');
			done();
		});
		it('should throw error if listener is not a function',function(done){
			expect(function(){
				slang.use('command',{});
			}).to.throw('plugin must be a function');
			done();
		});
	});
	describe('#run',function(){
		beforeEach(function(done){
			slang.reset();
			done();
		});
		it('should throw error if payload is null',function(done){
			expect(function(){
				slang.run();
			}).to.throw('invalid payload');
			done();
		});
		it('should throw error if payload is undefined',function(done){
			expect(function(){
				slang.run();
			}).to.throw('invalid payload');
			done();
		});
		it('should throw error if payload.command is null',function(done){
			expect(function(){
				slang.run({command:null});
			}).to.throw('invalid payload');
			done();
		});
		it('should throw error if payload.command is undefined',function(done){
			expect(function(){
				slang.run({});
			}).to.throw('invalid payload');
			done();
		});
		it('should not call listener for unregistered command',function(done){
			slang.use('/command',function listener(payload,service) {
				assert.fail('listener should not be called');
			});	
			slang.run({command:'/not'});
			done();
		});
		it('should call listener for registered command',function(done){
			slang.use('/command',function listener(payload,service) {
				expect(payload).to.not.be.null;
				expect(service).to.not.be.null;
				done();
			});
			slang.run({command:'/command'});
		});
	})
});