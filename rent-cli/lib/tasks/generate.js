'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _writefile = require('writefile');

var _writefile2 = _interopRequireDefault(_writefile);

var _ui = require('../util/ui');

var _ui2 = _interopRequireDefault(_ui);

var _readAndRenderTemplate = require('./readAndRenderTemplate');

var _readAndRenderTemplate2 = _interopRequireDefault(_readAndRenderTemplate);

var _renderTargetPath = require('./renderTargetPath');

var _renderTargetPath2 = _interopRequireDefault(_renderTargetPath);

var _getRentConfig = require('./getRentConfig');

var _getRentConfig2 = _interopRequireDefault(_getRentConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generate = function generate(args) {
  _classCallCheck(this, generate);

  _initialiseProps.call(this);

  this.ui = new _ui2.default({});
  this.rentConfig = (0, _getRentConfig2.default)();
  this.availableBluePrints = this.rentConfig.blueprints.map(function (bp) {
    return bp.name;
  });
  this.processArgs(args);
}

/**
 * Process the given arguments to render the target path and the target boilerplate
 * @param args
 */


/**
 * Write the generated string to the target path
 * @param target
 */


/**
 * Run the code generation for all available targets
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.processArgs = function (args) {
    if (args.length < 2) {
      _this.ui.writeError('Please pass relevant number of arguments');
      process.exit(1);
    }

    if (_this.availableBluePrints.indexOf(args[0]) === -1) {
      _this.ui.writeError('Provided generator command \'' + args[0] + '\' is not available');
      process.exit(1);
    }
    _this.blueprint = _this.rentConfig.blueprints[_this.availableBluePrints.indexOf(args[0])];

    // Check whether the given entity name have a parent module name and process it if available
    if (args[1].split('/').length > 1) {
      _this.parentModule = args[1].split('/')[0];
      _this.entityName = args[1].split('/')[1];
    } else {
      _this.entityName = args[1];
    }

    try {
      // Render target path string and render the blueprint template with ejs
      _this.targets = _this.blueprint.files.map(function (t) {
        return {
          'blueprint-path': t['blueprint-path'],
          'target-path': (0, _renderTargetPath2.default)(t['target-path'], _this.entityName, _this.ui, t['parent-path'], _this.parentModule),
          renderedTemplate: (0, _readAndRenderTemplate2.default)(t['blueprint-path'], _this.entityName, _this.ui, _this.parentModule)
        };
      });
    } catch (e) {
      _this.ui.writeError('Error rendering blueprint');
      process.exit(1);
    }
  };

  this.writeTarget = function (target) {
    (0, _writefile2.default)(process.cwd() + '/' + target['target-path'], target.renderedTemplate, function (err) {
      if (err) {
        _this.ui.writeError(err);
        exit(1);
      } else {
        _this.ui.writeInfoLine('Created ' + target['target-path']);
      }
    });
  };

  this.run = function () {
    _this.targets.forEach(function (target) {
      return _this.writeTarget(target);
    });
    _this.ui.writeInfoLine('File Generated Successfully');
  };
};

exports.default = generate;