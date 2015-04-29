var request = require('request');

var config = {
  baseUrl : "https://industrialcolor.pagerduty.com/api/v1/",
  escalation_policy : "ICSoftware Prod Support",
  api_token : process.env.PAGERDUTY_TOKEN
};

function parseOncallData(data,level){
  if (!data) {
    throw new Error('Oncall data cannot be null or empty.');
  }
  if (!data.escalation_policies || !data.escalation_policies[0]) {
    throw new Error('Oncall data does not contain escalation policies.');
  }

  var list = [];
  var index = level;
  var levels = [[],[],[]];

  function splitOncallLevels(oncall){
    var current = parseInt(oncall.level);
    if (!levels[current]){
      levels[current] = [];
    }
    levels[current].push(oncall);
  }

  var persons = data.escalation_policies[0].on_call;
  persons.forEach(splitOncallLevels);

  if(index && levels[index]) {
    list = levels[index].slice(levels[index].length - 1);
  }
  else {
    levels.forEach(function(lvl){ if(lvl[0]) { list.push(lvl[0]); } });
  }

  return list;
};

var pagerduty = {
  oncall : function(opts,callback) {
             var options = {};
             options.qs = {};
             options.headers = {};
             options.json = true;
             options.url = config.baseUrl + "escalation_policies/on_call";
             options.qs.query = opts.policy || config.escalation_policy;
             options.headers.Authorization = 'Token token=' + config.api_token;

             request.get(options, function(err, response, body){
               if(err || response.statusCode !== 200) {
                 var error = err || new Error('pagerduty api responded with ' + response.statusCode);
                 return (callback(error));
               }
               else {
                 var level = opts.level;
                 var persons_oncall = parseOncallData(body,level);
                 return (callback(null, persons_oncall));
               }
             }); 
           }
};

module.exports = pagerduty;
