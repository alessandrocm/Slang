'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var request = Promise.promisifyAll(require('request'));
var slack = require('./../lib/slack');

function SlackService(options) {
	options || (options = {});
	request = options.request;
	this._message = null;
	this._url = options.hook;
}

SlackService.prototype.reset = function reset() {
	this._message = null;
}

SlackService.prototype.message = function message(text,channel,username,emoji) {
	this._message = new slack.Message(text,channel,username,emoji);
	return this;
}

SlackService.prototype.attach = function attach(fallback,color){
	if (!this._message) {
		throw new Error('No message to attach to.');
	}
	else {
		this._message.attach(new slack.Attachment(fallback,color));
		return this;
	}
}

SlackService.prototype.field = function field(title,value,isShort){
	if (!this._message) {
		throw new Error('No message to attach field to.');
	} 
	else if (this._message.attachments.length === 0) {
		throw new Error('No attachments to attach field to.');
	}
	else {
		_.last(this._message.attachments).addField(title,value,isShort);
		return this;
	}
}

SlackService.prototype.send = function send(){
	var self = this;
	if(_.isNull(self._url) || _.isUndefined(self._url)) {
		return Promise.reject(new Error('Url cannot be null or undefined.'));
	}
	else if(!self._message) {
		return Promise.reject(new Error('No message to send.'));
	}
	else {
		return new Promise(function promise(resolve,reject){
			request.postAsync({
				url 	: self._url,
				form	: {
					payload	: JSON.stringify(self._message)
				}
			})
			.then(function(){
					self.reset();
					resolve();
				})
			.catch(reject);
		});
	}
}

module.exports = SlackService;