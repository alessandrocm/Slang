"use strict";

function foo(request) {
  return;
}

module.exports = function(app) {
  app.use('/foo', foo);
}