'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check whether the given RENT config is valid or not
 * @param config
 * @returns {boolean}
 */
var validateRentConfig = function validateRentConfig(config) {
  var valid = true;
  var requiredKeys = ['blueprints'];
  var requiredBlueprintKeys = ['name', 'description', 'usage', 'files'];
  var requiredFileKeys = ['blueprint-path', 'target-path'];

  if (!requiredKeys.every(function (c) {
    return c in config;
  })) {
    return false;
  }

  config.blueprints.forEach(function (b) {
    if (!requiredBlueprintKeys.every(function (c) {
      return c in b;
    })) {
      valid = false;
    } else {
      if (b.files) {
        b.files.forEach(function (file) {
          if (!requiredFileKeys.every(function (c) {
            return c in file;
          })) {
            valid = false;
          }
        });
      }
    }
  });

  return valid;
};

exports.default = function () {
  try {
    var rentConfig = require(process.cwd() + '/rent.json');
    if (!validateRentConfig(rentConfig)) {
      console.log(_chalk2.default.red('Your rent config is invalid.'));
      process.exit(1);
    }
    return rentConfig;
  } catch (e) {
    console.log(_chalk2.default.red('Make sure your are in root directory of your rent-web.'));
    return process.exit(1);
  }
};