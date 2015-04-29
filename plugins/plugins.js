var broadway = require('broadway')
  , fs = require('fs')
  , path = require('path')
  , options = {}
  , commands = new broadway.App();
  

function loadDirectories(dir){
  return fs.readdirSync(dir).filter(function(file){
    return fs.statSync(path.join(dir,file)).isDirectory();
  });
}

function loadPlugins(dir){
  var directories = loadDirectories(dir);
  var i = 0;
  var length = directories.length;

  for(i;i < length;i++){
    commands.use(require(path.join(dir, directories[i], 'plugin')),options);
  }
}

module.exports.load = function(options) {
  var dir = (options && options.dir) ? path.join(__dirname,options.dir) : __dirname;
  loadPlugins(dir);
  commands.init(function(err){
    if (err) {
      throw err;
    }
  });

  return {
    run : function(request,callback){
            if (!request) {
              return (callback(new Error('slack request cannot be null.')));
            }
            if (!request.command || request.command.length === 0) {
              return (callback(new Error('invalid slack command.')));
            }

            var method = request.command.substr(1);
            if (commands.hasOwnProperty(method) && typeof commands[method] === 'function') {
              return (commands[method](request, callback));
            }
            
            return (callback(new Error('No plugin configured for slash command.')));
          }
  };
}
