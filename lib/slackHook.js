var request = require('request');

function SlackHook(options) {
  this.url = options.url;
  this.httpClient = options.http || request;
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
  this.httClient.post(this.url, function(err,response,body){
    if (err || response !== 200) {
      return (callback(err));
    }
    else {
      return (callback());
    }
  });
};

module.exports = SlackHook;
