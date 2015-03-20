var Hook = request('./slackHook');
var Request = request('./slackRequest');
var Message = request('./slackMessage').Message;
var Attachment = request('./slackMessage').Attachment;

module.exports = {
  Hook : Hook,
  Request : Request,
  Message : Message,
  Attachment : Attachment
};
