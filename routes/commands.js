var express = require('express');
var slack = require('./../lib/slack');

var opts = {
  url : process.env.SLACK_HOOK
};

module.exports = function(bodyParser, commands){
  var router = express.Router();
  var urlencoder = bodyParser.urlencoded({extended:false});

  router.post('/commands', urlencoder, function(request,response) {
    var slackRequest = new slack.SlackRequest(request.body);
    var hook = new slack.Hook(opts); 
    var callback = function(error, result) {
      if (error) {
        response.sendStatus(500);
      }
      else if (result && result.message) {
        hook.send(result.message, function(err) {
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
