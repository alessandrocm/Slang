var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.sendStatus(204);
});

module.exports = app;
