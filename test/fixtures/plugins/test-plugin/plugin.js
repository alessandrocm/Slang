
function foo(request,callback) {
  return (callback(null, "OK"));
}

var testplugin = {
  'name' : 'test-plugin',

  'attach' : function attach(options) {
              this.foo = foo;  
            },
  
  'init' : function(done) {
            return done();
          }
};

module.exports = testplugin;
