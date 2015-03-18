var broadway = require('broadway')
  , fs = require('fs')
  , path = require('path')
  , options = {}
  , commands = new broadway.App();
  

function loadDirectories(){
  return fs.readdirSync(__dirname).filter(function(file){
    return fs.statSync(path.join(__dirname,file)).isDirectory();
  });
}

function loadPlugins(){
  var directories = loadDirectories();
  var i = 0;
  var length = directories.length;

  for(i;i < length;i++){
    commands.use(path.join(__dirname, directories[i], 'plugin'),options);
  }
}

module.exports.load = function() {
  loadPlugins();

  return {
    run : function(request,callback){
            if (!request) {
              return (callback(new Error('slack request cannot be null.')));
            }
            
            var method = request.command.substr(1);
            if (commands.hasOwnProperty(method) && typeof commands[method] === 'function') {
              return (commands[method](request, callback));
            }
            
            return (callback(new Error('No plugin configured for slash command.')));
          }
  };
}
