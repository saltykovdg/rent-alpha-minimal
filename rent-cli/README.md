# rent-cli

A CLI for rent-web.

```
npm run compile
npm install -g "./rent-cli"
```

## Generators

Generate modules, module components, actions, reducers, sagas using rent generator.

To list out all available generators
```
rent-gen
```

## Helpers CASE

```
helpers.camelCase('test string') => "testString"
helpers.constantCase('test string') => "TEST_STRING"
helpers.dotCase('test string') => "test.string"
helpers.headerCase('test string') => "Test-String"
helpers.lowerCase('TEST STRING') => "test string"
helpers.lowerCaseFirst('TEST') => "tEST"
helpers.noCase('test.string') => "test string"
helpers.noCase('camelCase') => "camel case"
helpers.paramCase('test string') => "test-string"
helpers.pascalCase('test string') => "TestString"
helpers.pathCase('test string') => "test/string"
helpers.sentenceCase('testString') => "Test string"
helpers.snakeCase('test string') => "test_string"
helpers.swapCase('Test String') => "tEST sTRING"
helpers.titleCase('a simple test') => "A Simple Test"
helpers.upperCase('test string') => "TEST STRING"
helpers.upperCaseFirst('test') => "Test"
```
