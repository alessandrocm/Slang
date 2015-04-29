var util = require('util');
var Message = require('./../../lib/slack').Message;
var Attachment = require('./../../lib/slack').Attachment;

function oncallMessage(args, data) {
  if (!args) {
    throw new Error('Slack arguments required.');
  }
  if (!data) {
    throw new Error('Oncall data required.');
  }

  var text = ''
    ,channel = args.channelId
    ,username = 'pagerduty'
    ,emoji = ':rotating_light:'
    ,fallbackFormat = 'Level %d oncall representative is %s.'
    ,fallback = ''
    ,color = 'good'
    ,attachment = null
    ,message = null;
  
  if (data.length > 1) {
    text = "The following persons are on call.";
  }
  else {
    text = "The following person is on call.";
  }

  if (args.channelName === 'directmessage'){
    channel = util.format('@%s', args.userName);
  }

  message = new Message(text,channel,username,emoji);

  data.forEach(function(level){
    color = (level.level == 1) ? 'good' : (level.level == 2) ? 'warning' : 'danger';
    fallback = util.format(fallbackFormat,level.level,level.user.name);
    attachment = new Attachment(fallback,color);
    attachment.addField(util.format('Level %d', level.level)
                      ,level.user.name
                      ,true);
    attachment.addField('Email'
                      ,level.user.email
                      ,true);
    message.addAttachment(attachment);
  });

  return message;
}

module.exports = oncallMessage;
