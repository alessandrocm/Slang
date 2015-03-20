
function SlackRequest(payload) {
  this.token = payload.token;
  this.teamId = payload.team_id;
  this.channelId = payload.channel_id;
  this.channelName = payload.channel_name;
  this.userId = payload.user_id;
  this.userName = payload.user_name;
  this.command = payload.command;
  this.text = payload.text;
}

module.exports = SlackRequest;
