/* globals describe, it, before, beforeEach, after, afterEach */
'use strict';

var expect = require('chai').expect;
var slack = require('./../lib/slack');

describe('Slack tests',function(){
	describe('Attachment',function(){
		describe('#constructor',function(){
			it('should return an instance of SlackAttachment',function(done){
				var target = new slack.Attachment('text','#ffffff');
				expect(target).to.be.an.instanceof(slack.Attachment);
				done();
			});
			it('should initialize fallback, color, and fields values', function(done){
				var target = new slack.Attachment('text','#ffffff');
				expect(target.fallback).to.be.equal('text');
				expect(target.color).to.be.equal('#ffffff');
				expect(target.fields).to.be.empty;
				done();
			});
			it('should serialize correctly with no fields',function(done){
				var attach = new slack.Attachment('test text', '#f3f3f3');
				var target = JSON.stringify(attach);
				expect(target).to.be.equal('{"fallback":"test text","color":"#f3f3f3","fields":[]}');
				done();
			});
		});
		describe('#addField',function(){
			it('should add a field to attachment',function(done){
				var target = new slack.Attachment('test text','#fff333');
				target.addField('title','value',true);
				target.addField('TITLE','VALUE',false);
				expect(target).to.have.property('fields')
					.and.to.be.length(2);
				done();
			});
			it('should serialize correctly with fields',function(done){
				var attach = new slack.Attachment('test text', '#f3f3f3');
				attach.addField('test title','test value', false);
				var target = JSON.stringify(attach);
				expect(target).to.be.equal('{"fallback":"test text","color":"#f3f3f3","fields":[{"title":"test title","value":"test value","short":false}]}');
				done();
			});
		});
	});
	describe('Message',function(){
		describe('#constructor',function(){
			it('should return an instance of SlackMessage',function(done){
				var target = new slack.Message('text','channel','username','emoji');
				expect(target).to.be.an.instanceof(slack.Message);
				done();
			});
			it('should initialize text, channel, username, emoji, and attachments',function(done){
				var target = new slack.Message('test_text','#channel', 'user_name',':emoji:');
				expect(target.text).to.be.equal('test_text');
				expect(target.channel).to.be.equal('#channel');
				expect(target.username).to.be.equal('user_name');
				expect(target.icon_emoji).to.be.equal(':emoji:');
				expect(target.attachements).to.be.empty;
				done();
			});
			it('should serialize correctly with no attachments',function(done){
				var message = new slack.Message('test_text','#channel', 'user_name',':emoji:');
				var target = JSON.stringify(message);
				expect(target).to.be.equal('{"text":"test_text","channel":"#channel","username":"user_name","icon_emoji":":emoji:","attachments":[]}');
				done();
			});
		});
		describe('#attach',function(){
			it('should add attachments to message',function(done){
				var target = new slack.Message('text','#channel', 'username',':emoji:');
				var attachment1 = new slack.Attachment('attach1','#ffffff');
				target.attach(attachment1);
				expect(target).to.have.deep.property('attachments');
				expect(target).to.have.deep.property('attachments[0].fallback','attach1');
				expect(target).to.have.deep.property('attachments[0].color','#ffffff');
				done();
			});
			it('should serialize correctly with attachments',function(done){
				var message = new slack.Message('test_text','#channel', 'user_name',':emoji:');
				var attachment = new slack.Attachment('attach1','#ffffff');
				attachment.addField('title','value', false);
				message.attach(attachment);
				var target = JSON.stringify(message);
				expect(target).to.be.equal('{"text":"test_text","channel":"#channel","username":"user_name","icon_emoji":":emoji:","attachments":[{"fallback":"attach1","color":"#ffffff","fields":[{"title":"title","value":"value","short":false}]}]}');
				done();
			});
		});
	});
});