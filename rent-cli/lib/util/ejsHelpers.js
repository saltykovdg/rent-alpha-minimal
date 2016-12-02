"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _changeCase = require("change-case");

var _changeCase2 = _interopRequireDefault(_changeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper functions which will passed while rendering ejs
 */
exports.default = {
  capitalize: function capitalize(n) {
    return n.charAt(0).toUpperCase() + n.slice(1);
  },
  camelCase: function camelCase(n) {
    return _changeCase2.default.camelCase(n);
  },
  constantCase: function constantCase(n) {
    return _changeCase2.default.constantCase(n);
  },
  dotCase: function dotCase(n) {
    return _changeCase2.default.dotCase(n);
  },
  headerCase: function headerCase(n) {
    return _changeCase2.default.headerCase(n);
  },
  lowerCase: function lowerCase(n) {
    return _changeCase2.default.lowerCase(n);
  },
  lowerCaseFirst: function lowerCaseFirst(n) {
    return _changeCase2.default.lowerCaseFirst(n);
  },
  noCase: function noCase(n) {
    return _changeCase2.default.noCase(n);
  },
  paramCase: function paramCase(n) {
    return _changeCase2.default.paramCase(n);
  },
  pascalCase: function pascalCase(n) {
    return _changeCase2.default.pascalCase(n);
  },
  pathCase: function pathCase(n) {
    return _changeCase2.default.pathCase(n);
  },
  sentenceCase: function sentenceCase(n) {
    return _changeCase2.default.sentenceCase(n);
  },
  snakeCase: function snakeCase(n) {
    return _changeCase2.default.snakeCase(n);
  },
  swapCase: function swapCase(n) {
    return _changeCase2.default.swapCase(n);
  },
  titleCase: function titleCase(n) {
    return _changeCase2.default.titleCase(n);
  },
  upperCase: function upperCase(n) {
    return _changeCase2.default.upperCase(n);
  },
  upperCaseFirst: function upperCaseFirst(n) {
    return _changeCase2.default.upperCaseFirst(n);
  }
};

// changeCase.camelCase('test string') => "testString"
// changeCase.constantCase('test string') => "TEST_STRING"
// changeCase.dotCase('test string') => "test.string"
// changeCase.headerCase('test string') => "Test-String"
// changeCase.lowerCase('TEST STRING') => "test string"
// changeCase.lowerCaseFirst('TEST') => "tEST"
// changeCase.noCase('test.string') => "test string"
// changeCase.noCase('camelCase') => "camel case"
// changeCase.paramCase('test string') => "test-string"
// changeCase.pascalCase('test string') => "TestString"
// changeCase.pathCase('test string') => "test/string"
// changeCase.sentenceCase('testString') => "Test string"
// changeCase.snakeCase('test string') => "test_string"
// changeCase.swapCase('Test String') => "tEST sTRING"
// changeCase.titleCase('a simple test') => "A Simple Test"
// changeCase.upperCase('test string') => "TEST STRING"
// changeCase.upperCaseFirst('test') => "Test"