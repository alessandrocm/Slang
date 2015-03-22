var Hook = require('./slackHook');
var Request = require('./slackRequest');
var Message = require('./slackMessage').Message;
var Attachment = require('./slackMessage').Attachment;

module.exports = {
  Hook : Hook,
  Request : Request,
  Message : Message,
  Attachment : Attachment
};
