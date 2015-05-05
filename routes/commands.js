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
        console.log(error.message);
        return;
      }

      if (message) {
        hook.send(message, function(err) {
          if (err) {
            console.log(err.message);
          }
        });    
      }
    };
    commands.run(slackRequest,callback);
    response.sendStatus(204);
  });
  
  return router;
};
