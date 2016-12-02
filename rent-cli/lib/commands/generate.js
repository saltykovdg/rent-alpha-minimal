'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _generate = require('../tasks/generate');

var _generate2 = _interopRequireDefault(_generate);

var _getRentConfig = require('../tasks/getRentConfig');

var _getRentConfig2 = _interopRequireDefault(_getRentConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_commander2.default.description('Generate components, modules, actions, reducers, saga using rent generator').arguments('<generator> [args]').parse(process.argv);

/**
 * Generate string output for a single blueprint
 * @param blueprint
 */
var printBlueprint = function printBlueprint(blueprint) {
  console.log('    ' + _chalk2.default.yellow(blueprint.name) + ' - ' + blueprint.description);
  console.log('    Usage: ' + blueprint.usage);
  console.log('');
};

_commander2.default.on('--help', function () {
  // Get available blueprints from the current rent project
  var blueprints = (0, _getRentConfig2.default)().blueprints;
  console.log(_chalk2.default.yellow('Available Generators'));
  console.log(_chalk2.default.yellow('____________________'));
  console.log('');

  blueprints.forEach(function (b) {
    return printBlueprint(b);
  });
});

if (!_commander2.default.args.length) {
  _commander2.default.help();
}

new _generate2.default([].concat(_toConsumableArray(_commander2.default.args))).run();