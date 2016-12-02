import changeCase from "change-case";

/**
 * Helper functions which will passed while rendering ejs
 */
export default {
  capitalize: n => n.charAt(0).toUpperCase() + n.slice(1),
  camelCase: n => changeCase.camelCase(n),
  constantCase: n => changeCase.constantCase(n),
  dotCase: n => changeCase.dotCase(n),
  headerCase: n => changeCase.headerCase(n),
  lowerCase: n => changeCase.lowerCase(n),
  lowerCaseFirst: n => changeCase.lowerCaseFirst(n),
  noCase: n => changeCase.noCase(n),
  paramCase: n => changeCase.paramCase(n),
  pascalCase: n => changeCase.pascalCase(n),
  pathCase: n => changeCase.pathCase(n),
  sentenceCase: n => changeCase.sentenceCase(n),
  snakeCase: n => changeCase.snakeCase(n),
  swapCase: n => changeCase.swapCase(n),
  titleCase: n => changeCase.titleCase(n),
  upperCase: n => changeCase.upperCase(n),
  upperCaseFirst: n => changeCase.upperCaseFirst(n),
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
