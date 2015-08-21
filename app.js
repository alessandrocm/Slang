/* global process */
'use strict';
var express = require('express'),
    _ = require('lodash'),
    parser = require('body-parser').urlencoded({extended:false}),
    app = express();

var slang = require('./lib/slang'),
    commands = require('./plugins')({
                        directory   :   process.env.PLUGINS_PATH,
                        slang       :   slang
                    });

app.post('/command', parser, function(request, response){
    var payload = request.body;
    if(!_.isNull(payload) && !_.isUndefined(payload) && 
        !_.isNull(payload.command) && !_.isUndefined(payload.command)) {
        
        slang.run(payload);
        response.sendStatus(204);
    }
    else {
        response.sendStatus(400);   
    }
});

app.get('/', function(request, response){
    response.sendStatus(204);
});

module.exports = app;
