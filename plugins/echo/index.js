'use strict';

var util = require('util');

function echo(request, slack) {
  if (request) {
      var channel = '#general';
      if(request.channel_name === 'directmessage') {
        channel = util.format('@%s',request.user_name);   
      }
      else {
          channel = request.channel_id;
      }
      slack.message(request.text, channel, 'Slang', ':smiley:').send();
  }
};

module.exports = function(slang) {
  slang.use('/echo', echo);
};