var express = require('express');
var SlackRequest = require('./../lib/slackRequest').SlackRequest;

module.exports = function(bodyParser, commands){
  var router = express.Router();
  var urlencoder = bodyParser.urlencoded({extended:false});

  router.post('/commands', urlencoder, function(request,response) {
    var slackRequest = new SlackRequest(request.body);
    commands.run(slackRequest, function(error, result) {
      if (error) {
        response.sendStatus(500);
      }
      else if (result.message) {
        response.sendStatus(204); //TODO: Send message to Slack incoming hook.
      }
      else {
        response.sendStatus(204);
      }
    });
  });
  
  return router;
};
