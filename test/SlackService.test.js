/* global describe, before, beforeEach, it */
'use strict';

var expect = require('chai').expect;
var Promise = require('bluebird');
var SlackService = require('./../lib/SlackService');

describe('SlackService',function(){
	describe('#constructor',function(){
		it('should create instance of SlackService',function(done){
			var target = new SlackService();
			expect(target).to.not.be.null;
			expect(target).to.be.instanceof(SlackService);
			done();
		});
	});
	describe('#message',function(){
		it('should return instance of SlackService',function(done){
			var target = new SlackService();
			var actual = target.message('MESSAGE','#CHANNEL','@USER',':EMOJI:');
			expect(actual).to.be.instanceof(SlackService);
			expect(actual).to.have.deep.property('_message.text')
				.to.be.equal('MESSAGE');
			expect(actual).to.have.deep.property('_message.channel')
				.to.be.equal('#CHANNEL');
			expect(actual).to.have.deep.property('_message.username')
				.to.be.equal('@USER');
			expect(actual).to.have.deep.property('_message.icon_emoji')
				.to.be.equal(':EMOJI:');
			expect(actual).to.have.deep.property('_message.attachments')
				.to.be.empty;
			done();
		});
	});
	describe('#attach',function(){
		it('should throw error if no message exists',function(done){
			var target = new SlackService();
			expect(function(){
				target.attach('FALLBACK','#FFFFFF');	
			}).to.throw('No message to attach to.');
			done();
		});
		it('should return SlackService if successful',function(done){
			var target = new SlackService();
			var actual = target.message('MESSAGE')
						.attach('FB1','#FFFFFF')
						.attach('FB2','#000000');
			expect(actual).to.be.instanceof(SlackService);
			expect(actual).to.have.deep.property('_message.attachments[0]')
				.to.not.be.null;
			expect(actual).to.have.deep.property('_message.attachments[0].fallback')
				.to.be.equal('FB1');
			expect(actual).to.have.deep.property('_message.attachments[0].color')
				.to.be.equal('#FFFFFF');
			expect(actual).to.have.deep.property('_message.attachments[0].fields')
				.to.be.empty;
			expect(actual).to.have.deep.property('_message.attachments[1].fallback')
				.to.be.equal('FB2');
			expect(actual).to.have.deep.property('_message.attachments[1].color')
				.to.be.equal('#000000');
			expect(actual).to.have.deep.property('_message.attachments[1].fields')
				.to.be.empty;
			done();
		});
	});
	describe('#field',function(){
		it('should throw error if no message exists',function(done){
			var target = new SlackService();
			expect(function(){
				target.field('TITLE','VALUE',true);
			}).to.throw('No message to attach field to.');
			done();
		});
		it('should throw error if no attachment exists',function(done){
			var target = new SlackService();
			expect(function(){
				target.message().field('TITLE','VALUE',true);
			}).to.throw('No attachments to attach field to.');
			done();
		});
		it('should return SlackService if successful',function(done){
			var target = new SlackService();
			var actual = target.message('MESSAGE')
								.attach('FB','#FFFFFF')
								.field('TITLE1','VALUE1',true)
								.field('TITLE2','VALUE2',false);
			expect(actual).to.be.instanceof(SlackService);
			expect(actual).to.have.deep.property('_message.attachments[0].fields[0].title')
				.to.be.equal('TITLE1');
			expect(actual).to.have.deep.property('_message.attachments[0].fields[0].value')
				.to.be.equal('VALUE1');
			 expect(actual).to.have.deep.property('_message.attachments[0].fields[0].short')
			 	.to.be.ok;
			expect(actual).to.have.deep.property('_message.attachments[0].fields[1].title')
				.to.be.equal('TITLE2');
			expect(actual).to.have.deep.property('_message.attachments[0].fields[1].value')
				.to.be.equal('VALUE2');
			 expect(actual).to.have.deep.property('_message.attachments[0].fields[1].short')
			 	.to.not.be.ok;
			done();
		});
	});
	describe('#send',function(){
		var request;
		beforeEach(function(done){
			request = {};
			done();
		});
		it('should return a promise',function(done){
			request.post = function() { };
			var target = new SlackService({
					request	:	Promise.promisifyAll(request),
					hook	: 	'https://slack.com/endpoint'
				});
			var actual = target.message('TEST').send();
			expect(actual).to.be.instanceof(Promise);
			done();
		});
		it('should reject if url is null',function(done){
			var target = new SlackService({
					hook	: 	null
				});
			target.message('TEST').send().catch(function(err){
				expect(err).to.not.be.null;
				expect(err.message).to.be.equal('Url cannot be null or undefined.');
				done();
			});
		});
		it('should reject if no message is set',function(done){
			var target = new SlackService({
					hook	: 	'https://slack.com/endpoint'
				});
			target.send().catch(function(err){
				expect(err).to.not.be.null;
				expect(err.message).to.be.equal('No message to send.');
				done();
			});
		});
		it('should reject if slack hook responds with error',function(done){
			request.post = function(data,cb) { cb(new Error('404')); };
			var target = new SlackService({
					request	:	Promise.promisifyAll(request),
					hook	: 	'https://slack.com/endpoint'
			});
			target.message('TEXT').send('http://null').catch(function(err){
				expect(err).to.not.be.null;
				expect(err.message).to.be.equal('404');
				done();
			});
		});
		it('should resolve if slack hook responds successfully',function(done){
			request.post = function(data, cb) { cb(); };
			var target = new SlackService({
					request	:	Promise.promisifyAll(request),
					hook	: 	'https://slack.com/endpoint'
			});
			target.message('TEXT').send('http://null').then(function(){
				done();
			});
		});
	});
});