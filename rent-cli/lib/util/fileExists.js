'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function to check whether file exists in given path or not.
 * @param path
 * @returns {boolean}
 */
exports.default = function (path) {
  try {
    _fs2.default.accessSync(path, _fs2.default.F_OK);
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    }
    throw e;
  }
};