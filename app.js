var express = require('express');
var bodyParser = require('body-parser');
var commands = require('./plugins/plugins').load();
var app = express();
var commandRoutes = require('./routes/commands')(bodyParser, commands);

app.use('/slash',commandRoutes);

app.get('/', function(request, response){
    response.sendStatus(204);
});

module.exports = app;
