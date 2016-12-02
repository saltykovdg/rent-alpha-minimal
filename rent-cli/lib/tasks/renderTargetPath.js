'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _ejsHelpers = require('../util/ejsHelpers');

var _ejsHelpers2 = _interopRequireDefault(_ejsHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('shelljs/global');

/**
 * Render the target path with the given input using ejs
 * @param targetPath
 * @param entityName
 * @param ui
 * @param parentPath
 * @param parent
 * @returns {*}
 */

exports.default = function (targetPath, entityName, ui) {
  var parentPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var parsedPath = _ejs2.default.render(targetPath, {
    name: entityName,
    helpers: _ejsHelpers2.default
  });
  var parsedParentPath = '';

  // If parent is provided, check whether the parent folder exists or not
  if (parent) {
    parsedParentPath = _ejs2.default.render(parentPath, {
      parent: parent,
      helpers: _ejsHelpers2.default
    });
    if (test('-e', process.cwd() + '/' + parsedParentPath)) {
      parsedParentPath = parsedParentPath + '/';
    } else {
      ui.writeError('Module ' + parent + ' doesn\'t exist in ' + parsedParentPath + '.');
      return process.exit(1);
    }
  }

  if (!test('-e', parsedParentPath + parsedPath)) {
    return parsedParentPath + parsedPath;
  }

  ui.writeError('File already exists in ' + parsedPath + '. Please choose another name.');
  return process.exit(1);
};