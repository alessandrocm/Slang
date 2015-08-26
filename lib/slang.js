/* global process */

'use strict';
var EventEmitter = require('events').EventEmitter,
    SlackService = require('./slackService'),
    _ = require('lodash'),
    log = require('./logger'),
    event = new EventEmitter(),
    hookUrl = process.env.SLACK_HOOK;

function use(command, listener) {
    log.info('Registering listener');
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
        log.info('Registering listener for ' + command);
        event.on(_.trim(command, '/'), listener);
    }
}

function run(payload) {
    log.info('Running ' + JSON.stringify(payload));
    if (_.isNull(payload) || _.isUndefined(payload) ||
        _.isNull(payload.command) || _.isUndefined(payload.command)) {
        throw new Error('invalid payload.');
    }
    else {
        log.info('Emitting event ' + payload.command);
        event.emit(_.trim(payload.command, '/'),
            payload,
            new SlackService({
                hook: hookUrl,
                logger: log
            })
            );
    }
}

function reset() {
    log.info('Removing all listeners');
    event.removeAllListeners();
    log.info('All listeners removed');
}

module.exports = {
    use: use,
    run: run,
    reset: reset
};