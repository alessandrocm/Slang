/* global __dirname */
'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');
  
function loadDirectories(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function loadPlugins(options) {
  if(_.isNull(options) || _.isUndefined(options)) {
    throw new Error('Options cannot be null or undefined');
  }
  var currentDir = (options.directory) ? path.join(__dirname,options.directory) : __dirname;
  var directories = loadDirectories(currentDir);
  var length = directories.length;
  var plugin;

  for (var i = 0; i < length; i++) {
    plugin = require(path.join(currentDir, directories[i]));
    if (plugin){
      plugin(options.slang)
    }
    plugin = null;
  }
}

module.exports = loadPlugins;