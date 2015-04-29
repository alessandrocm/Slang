
function foo(request,callback) {
  return (callback(null, "OK"));
}

function bar(request,callback){
  return (callback());
}

var testplugin = {
  'name' : 'test-plugin',

  'attach' : function attach(options) {
              this.foo = foo;
              this.bar = bar;
            },
  
  'init' : function(done) {
            return done();
          }
};

module.exports = testplugin;
