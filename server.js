'use strict';
var server = require('./app.js');
var log = require('./lib/logger');
var port = process.env.PORT || 3000;

server.listen(port, function () {
    log.info('Slang listening on port ' + port);
});
