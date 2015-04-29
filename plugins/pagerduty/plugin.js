var pagerduty = require('./pagerduty');
var messages = require('./pagerduty-messages');

function oncall(request, callback) {
  if (!request) {
    return (callback(new Error('slack request cannot be null.')));
  }

  pagerduty.oncall(opts, function(err,data){ 
    if(err) {
      return (callback(err));
    }

    //Create SlackMessage
    var message = messages.oncall(request, data);
    return (callback(null, message));

  })
}

var pagerduty = {
  'name' : 'pagerduty-plugin',

  'attach' : function attach(options) {
              this.oncall = oncall;  
            },
  
  'init' : function(done) {
            return done();
          }
};

module.exports = pagerduty;
