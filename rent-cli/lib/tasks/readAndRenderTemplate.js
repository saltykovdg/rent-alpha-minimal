'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _ejsHelpers = require('../util/ejsHelpers');

var _ejsHelpers2 = _interopRequireDefault(_ejsHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Read the blueprint file and render ejs with the given parameters
 * @param bluePrintPath
 * @param entityName
 * @param ui
 * @param parent
 * @returns {string}
 */
exports.default = function (bluePrintPath, entityName, ui) {
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var template = void 0;
  try {
    template = _fs2.default.readFileSync(process.cwd() + '/' + bluePrintPath, 'utf8');
  } catch (e) {
    ui.writeError('Blueprint file doesn\'t exist in ' + bluePrintPath + '.');
    process.exit(1);
  }

  return _ejs2.default.render(template, {
    name: entityName,
    parent: parent,
    helpers: _ejsHelpers2.default
  });
};