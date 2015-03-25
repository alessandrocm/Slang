var request = require('request');

function SlackHook(options) {
  if (!options || !options.url) {
    throw new Error('Hook url is required');
  }
  this.url = options.url;
}

SlackHook.prototype.send = function(payload,callback) {
  if (!payload) {
    return (callback(new Error('no payload or payload is null')));
  }

  var data = {
    url : this.url,
    form : {
      payload : JSON.stringify(payload)
    }
  };
  request.post(data, function(err,response,body){
    if (err || response.statusCode !== 200) {
      return (callback(err));
    }
    else {
      return (callback());
    }
  });
};

module.exports = SlackHook;
