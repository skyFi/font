'use strict';

require('./lib/font.js');

var strDOMLength = function (str, option) {
  return new Promise(function(resolve, reject) {
    if (!Font) {
      reject('font init err, retry it.');
    }
    // config option
    var _opt = Object.assign({
      fontFamily: `'PingFang SC', sans-serif`,
      fontSize: 16,
      fontWeight: '',
      src: '', // use system font(s)
    }, option);

    // empty string
    if (!str) {
      resolve({
        width: 0,
        fontSize: _opt.fontSize,
        fontFamily: _opt.fontFamily,
        src: _opt.src || 'system font'
      })
    }

    // let's load a font!
    var font = new Font();

    // set up the onload handler
    font.onload = function () {
      var measure = font.measureText(str, _opt.fontSize, _opt.fontWeight);
      resolve({
        width: measure.width,
        fontSize: measure.fontSize,
        fontFamily: measure.fontFamily,
        src: _opt.src || 'system font'
      });
    }

    // error handler
    font.onerror = function (err) { reject(err); }

    // then kick off font loading by assigning the "src" property
    font.fontFamily = _opt.fontFamily;
    font.src = _opt.src;
  });
};

module.exports = strDOMLength;
