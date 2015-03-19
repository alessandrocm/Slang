var util = require('util')

var MessageAttachment = function(fallback,color){
  this.fallback = fallback
  this.color = color
  this.fields = []
}

MessageAttachment.prototype = (function(){
  var addField = function(title, value, isShort){
                  var field = {};
                  field.title = title
                  field.value = value
                  field.short = isShort
                  this.fields.push(field) 
                 }

  return {
    addField : addField
  };
})()

var SlackMessage = function(text,channel,username,emoji){
  this.text = text
  this.channel = channel
  this.username = username
  this.icon_emoji = emoji
  this.attachments = []
}

SlackMessage.prototype = (function(){
  var addAttachment = function(messageAttachment){
                        this.attachments.push(messageAttachment)
                      }

  return  { 
    addAttachment : addAttachment
  };
})()

module.exports.Attachment = MessageAttachment;
module.exports.Message = SlackMessage;
