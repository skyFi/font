var EasyFont = require('../src/index');

new EasyFont().pipe('Skylor.min is very handsome!')
    .operation('measure')
    .option({ fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
    .value()
    .then(function (result) {
      console.log(result);
    });


new EasyFont().pipe('Skylor.min is very handsome!')
  .operation('truncate')
  .option({ width: 20, row: 2, fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
  .value()
  .then(function (result) {
    console.log(result);
  });