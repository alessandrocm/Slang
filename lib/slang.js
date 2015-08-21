/* global process */

"use strict";
var EventEmitter = require('events').EventEmitter,
	SlackService = require('./slackService'),
   	event = new EventEmitter(),
	_ = require('lodash'),
	hookUrl = process.env.SLACK_HOOK;

function use(command, listener) {
	if (_.isNull(command) || _.isUndefined(command)) {
		throw new Error('command cannot be null or undefined');
	}
	else if (_.isNull(listener) || _.isUndefined(listener)) {
		throw new Error('plugin cannot be null or undefined');
	}
	else if (!_.isFunction(listener)) {
		throw new Error('plugin must be a function');
	}
	else {
		event.on(_.trim(command,'/'),listener);
	}
}

function run(payload) {
	if (_.isNull(payload) || _.isUndefined(payload) ||
		_.isNull(payload.command) || _.isUndefined(payload.command)) {
			throw new Error('invalid payload');
	}
	else {
		event.emit(_.trim(payload.command,'/'),payload, new SlackService({hook:hookUrl}));
	}
}

function reset() {
	event.removeAllListeners();
}

module.exports = {
	use	: use,
	run : run,
	reset : reset
};