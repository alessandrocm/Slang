/* global process */
'use strict';
var express = require('express'),
    _ = require('lodash'),
    parser = require('body-parser').urlencoded({extended:false}),
    log = require('./lib/logger'),
    slang = require('./lib/slang'),
    plugins = require('./plugins'),
    app = express();

log.info('Initializing Slang and loading plugins');
plugins({
    directory   :   process.env.PLUGINS_PATH,
    slang       :   slang
});
log.info('Plugins loaded');

app.post('/command', parser, function(request, response){
    log.info('POST /command request received');
    var payload = request.body;
    if(!_.isNull(payload) && !_.isUndefined(payload) && 
        !_.isNull(payload.command) && !_.isUndefined(payload.command)) {
        try {
            log.info('Valid request, running plugins');
            slang.run(payload);
            response.sendStatus(204);
            log.info('Plugins run, 204 response sent');
        }
        catch (error) {
            log.error(error);
            response.sendStatus(400);
        }
    }
    else {
        log.info('Invalid request, 400 response sent');
        response.sendStatus(400);   
    }
});

app.get('/', function(request, response){
    log.info('GET / request received');
    response.sendStatus(204);
    log.info('204 response sent');
});

module.exports = app;
