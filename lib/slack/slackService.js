'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var request = Promise.promisifyAll(require('request'));
var log = require('./../logger');
var slack = require('./slackMessage');

function SlackService(options) {
    options || (options = {});
    request = options.request || request;
    log = options.logger || log;
    this._message = null;
    this._url = options.hook;
}

SlackService.prototype.reset = function reset() {
    this._message = null;
};

SlackService.prototype.message = function message(text, channel, username, emoji) {
    this._message = new slack.Message(text, channel, username, emoji);
    return this;
};

SlackService.prototype.attach = function attach(fallback, color) {
    if (!this._message) {
        log.warn('No message to attach to.');
    }
    else {
        this._message.attach(new slack.Attachment(fallback, color));
    }
    return this;
};

SlackService.prototype.field = function field(title, value, isShort) {
    if (!this._message) {
        log.warn('No message to attach field to.');
    }
    else if (this._message.attachments.length === 0) {
        log.warn('No attachments to attach field to.');
    }
    else {
        _.last(this._message.attachments).addField(title, value, isShort);
    }
    return this;
};

SlackService.prototype.send = function send() {
    var self = this;
    var reason = null;
    if (_.isNull(self._url) || _.isUndefined(self._url)) {
        reason = 'Url cannot be null or undefined.';
        log.error(reason);
        return Promise.reject(new Error(reason));
    }
    else if (!self._message) {
        reason = 'No message to send.';
        log.error(reason);
        return Promise.reject(new Error(reason));
    }
    else {
        return new Promise(function promise(resolve, reject) {
            log.info('Posting message to slack - ' + self._url + ' - ' + JSON.stringify(self._message));
            request.postAsync({
                url: self._url,
                form: {
                    payload: JSON.stringify(self._message)
                }
            })
                .then(function () {
                    log.info('Hook request successful');
                    self.reset();
                    resolve();
                })
                .catch(function (err) {
                    log.error(err);
                    reject(err);
                });
        });
    }
};

module.exports.Service = SlackService;