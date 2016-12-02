'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _os = require('os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_WRITE_LEVEL = 'INFO';

/**
 * Helper class to write debug output to console
 */
var UI = function () {
  function UI(options) {
    _classCallCheck(this, UI);

    this.inputStream = options.inputStream || process.stdin;
    this.outputStream = options.outputStream || process.stdout;
    this.errorStream = options.errorStream || process.stderr;
    this.WRITE_LEVELS = {
      DEBUG: 1,
      INFO: 2,
      WARNING: 3,
      ERROR: 4
    };
    this.writeLevel = 'INFO';
  }

  _createClass(UI, [{
    key: 'write',
    value: function write(data, writeLevel) {
      if (writeLevel === 'ERROR') {
        this.errorStream.write(data + _os.EOL);
      } else if (this.writeLevelVisible(writeLevel)) {
        this.outputStream.write(data);
      }
    }
  }, {
    key: 'writeError',
    value: function writeError(error) {
      this.write(_chalk2.default.red(error), 'ERROR');
    }
  }, {
    key: 'writeDebugLine',
    value: function writeDebugLine(data) {
      this.writeLine(_chalk2.default.gray(data), 'DEBUG');
    }
  }, {
    key: 'writeInfoLine',
    value: function writeInfoLine(data) {
      this.writeLine(_chalk2.default.cyan(data), 'INFO');
    }
  }, {
    key: 'writeLevelVisible',
    value: function writeLevelVisible(writeLevel) {
      var levels = this.WRITE_LEVELS;
      return levels[writeLevel || DEFAULT_WRITE_LEVEL] >= levels[this.writeLevel];
    }
  }, {
    key: 'writeLine',
    value: function writeLine(data, writeLevel) {
      this.write(data + _os.EOL, writeLevel);
    }
  }]);

  return UI;
}();

exports.default = UI;