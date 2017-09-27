'use strict';

var Font = require('./lib/font.js');

// 母体
function EasyFont() {
  this.$string = '';  // 初始值
  this.$option = {}; // 配置信息
  this.$result = {}; // 输出值
  this.$operationName = ''; // 操作
  this._settedOption = false;
}

/**
 * 入口函数
 * @param str 输入的字符串
 */
EasyFont.prototype.pipe = function(str) {
  this.$string = str;
  return this;
}

/**
 * 配置参数
 * @param option {object} 操作参数配置
 * measure: { fontSize, fontFamily, src, fontWeight }
 * truncate: { fontSize, fontFamily, src, fontWeight, width, row, lack, ellipsis }
 */
EasyFont.prototype.option = function (option) {
  this.$option = option;
  this._settedOption = true;
  verifyOption.bind(this)();
  return this;
}

/**
 * 设置操作
 * @param operation EasyFont.operationType
 */
EasyFont.prototype.operation = function (operation) {
  if (!verifyOperation.bind(this, operation)()) {
    throw 'operation should be one of ' + Object.keys(this.operationType).toString();
  }
  this.$operationName = operation;

  verifyOption.bind(this)();
  // 校验操作类型
  function verifyOperation (operation) {
    return Object.keys(this.operationType).some(function (ele) {
      return operation === ele;
    })
  }
  return this;
}

/**
 * 操作类型
 */
EasyFont.prototype.operationType = {
  measure: 'measure',
  truncate: 'truncate',
}

/**
 * 终点函数，获取结果值
 * @return Promise
 */
EasyFont.prototype.value = function () {

  /**
   * 测量字符串长度信息
   * @option { fontFamily, fontSize, fontWeight, src }
   */
  if (this.$operationName === this.operationType.measure) {
    return getMeasure.bind(this, this.$string, this.$option)();
  }

  // 字符串规则截断
  if (this.$operationName === this.operationType.truncate) {
    var originString = this.$string;
    var option = this.$option;
    return new Promise(function (resolve) {
      var _truncateOpt = Object.assign({}, {
        lack: 0,
        ellipsis: '...'
      }, option);

      var _resultString = originString + _truncateOpt.ellipsis;
      getMeasure.bind(this, _resultString, option)().then(function(result) {
        if (result) {
          var originRow = result.width / _truncateOpt.width;
          // 字符串短的情况
          if (originRow < _truncateOpt.row) {
            resolve({
              result: _resultString,
              origin: originString,
              row: _truncateOpt.row,
              boxWidth: _truncateOpt.width,
              lack: _truncateOpt.lack,
              ellipsis: _truncateOpt.ellipsis
            });
          } else {
            var lastIndex = Math.floor(_truncateOpt.width * _truncateOpt.row * _resultString.length / result.width) - 1;
            _truncateOpt.ellipsis = _truncateOpt.ellipsis || '';
            resolve({
              result: _resultString.slice(0, lastIndex - _truncateOpt.ellipsis.length) + _truncateOpt.ellipsis,
              origin: originString,    
              row: _truncateOpt.row,
              boxWidth: _truncateOpt.width,
              lack: _truncateOpt.lack,
              ellipsis: _truncateOpt.ellipsis
            });
          }
        }
      });
    });
  }
}

// 校验配置
function verifyOption () {
  if (this.$operationName && this.$operationName === this.operationType.truncate && this._settedOption && (!this.$option.width || !this.$option.row)) {
    throw new Error(this.$operationName + ' operation option mandotory: width, row');
  }
}

// 测量字符串
function getMeasure(str, option) {
  return new Promise(function (resolve) {
    // 判断依赖
    if (!Font) {
      console.error('EasyFont Error: easyfont should run into browser env.');
      resolve(null);
    }
    // 配置信息
    var _opt = Object.assign({
      fontFamily: "'PingFang SC', sans-serif",
      fontSize: 16,
      fontWeight: '',
      src: '', // use system font(s)
    }, option || {});

    // 『空』字符串的情况
    if (!str) {
      resolve({
        width: 0,
        fontSize: _opt.fontSize,
        fontFamily: _opt.fontFamily,
        src: _opt.src || 'system font'
      })
    }

    // 初始化
    var font = new Font();
    // 加载
    font.onload = function () {
      var measure = font.measureText(str, _opt.fontSize, _opt.fontWeight);
      resolve({
        width: measure.width,
        fontSize: measure.fontSize,
        fontFamily: measure.fontFamily,
        src: _opt.src || 'system font'
      });
    }

    // 加载失败
    font.onerror = function (err) {
      console.error('EasyFont Error: ' + err);
      resolve(null);
    }

    // 使用src标记加载事件完成
    font.fontFamily = _opt.fontFamily;
    font.src = _opt.src;
  });
}

module.exports = EasyFont;


/*
输入： string, width, row, lack, ellipsis

*/