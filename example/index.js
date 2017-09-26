var strDOMLength = require('../src/index');

strDOMLength('Skylor.min')
.then(function(data) {
  if (data) {
    console.log(data);
  }
});
