var express = require('express');
var slack = require('./../lib/slack');

var opts = {
  url : process.env.SLACK_HOOK
};

module.exports = function(bodyParser, commands){
  var router = express.Router();
  var urlencoder = bodyParser.urlencoded({extended:false});

  router.post('/commands', urlencoder, function(request,response) {
    var slackRequest = new slack.Request(request.body);
    var hook = new slack.Hook(opts); 
    var callback = function(error, message) {
      if (error) {
        response.sendStatus(500);
      }
      else if (message) {
        hook.send(message, function(err) {
          if (err) {
            response.sendStatus(500);
          }
          else {
            response.sendStatus(204);
          }
        });    
      }
      else {
        response.sendStatus(204);
      }
    };
    commands.run(slackRequest,callback);
  });
  
  return router;
};
