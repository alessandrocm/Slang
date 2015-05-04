var slack = require('./../../lib/slack');

function echo(request,callback) {
 if (!request) {
  return (callback(new Error('slack request cannot be null.')));
 }
 
 var message = new slack.Message(request.text, request.channelName, request.userId, ':smiley_face:');

 return (callback(null,message));
}

var plugin = {
  'name' : 'echo-plugin',

  'attach' : function attach(options) {
              this.echo = echo;
            },
  
  'init' : function(done) {
            return done();
          }
};

module.exports = plugin;
