"use strict";

function bar(request) {
  return;
}

module.exports = function(app) {
  app.use('/bar', bar);
}