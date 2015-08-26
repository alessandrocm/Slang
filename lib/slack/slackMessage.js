'use strict';

function SlackAttachment(fallback, color) {
    this.fallback = fallback;
    this.color = color;
    this.fields = [];
}

SlackAttachment.prototype.addField = function (title, value, isShort) {
    var field = {};
    field.title = title;
    field.value = value;
    field.short = isShort;
    this.fields.push(field);
};

function SlackMessage(text, channel, username, emoji) {
    this.text = text;
    this.channel = channel;
    this.username = username;
    this.icon_emoji = emoji;
    this.attachments = [];
}

SlackMessage.prototype.attach = function (attachment) {
    this.attachments.push(attachment);
};

module.exports.Attachment = SlackAttachment;
module.exports.Message = SlackMessage;
