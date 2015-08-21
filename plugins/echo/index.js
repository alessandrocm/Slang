'use strict';

var util = require('util');
var slack = null;

function echo(request, slack) {
  if (request) {
    var channel = util.format('@%s', request.userName);
    slack.message(request.text, channel, 'Slang', ':smiley:').send();
  }
};

module.exports = function(slang) {
  slang.use('/echo', echo);
};