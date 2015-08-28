'use strict';
var Message = require('./slackMessage').Message;
var Attachment = require('./slackMessage').Attachment;
var Service = require('./slackService').Service;

module.exports = {
    Message: Message,
    Attachment: Attachment,
    Service: Service
};
