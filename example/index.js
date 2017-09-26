require('../src/index');
strDOMLength('adb').then(function (measure) { console.log(measure) }, function (err) { console.log(err) });