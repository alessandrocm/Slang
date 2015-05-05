var slack = require('./../../lib/slack');
var util = require('util');

function echo(request,callback) {
 if (!request) {
  return (callback(new Error('slack request cannot be null.')));
 }

 var channel = util.format('@%s',request.userName);
 var message = new slack.Message(request.text, channel, 'Slang', ':smiley:');

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
