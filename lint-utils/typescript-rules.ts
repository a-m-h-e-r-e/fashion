/* eslint-disable @typescript-eslint/naming-convention */
import { off, error, warn } from './error-levels'
import paddingLineBetweenStatements from './padding-lines-between-statements'

const typescriptRules = {
  // disable common rules handled by typescript
  'camelcase'       : off,
  'no-fallthrough'  : off,
  'no-invalid-this' : off,

  '@stylistic/member-delimiter-style' : [
    error, {
      'multiline'  : { 'delimiter': 'none' },
      'singleline' : {
        'delimiter'   : 'comma',
        'requireLast' : false,
      },
    },
  ],

  // shadowed rules
  '@stylistic/block-spacing'                   : error,
  '@stylistic/brace-style'                     : [ error, '1tbs', { 'allowSingleLine': false } ],
  '@stylistic/comma-dangle'                    : [ error, 'always-multiline' ],
  '@stylistic/comma-spacing'                   : error,
  '@stylistic/function-call-spacing'           : error,
  '@stylistic/keyword-spacing'                 : error,
  '@stylistic/lines-between-class-members'     : [ error, 'always' ],
  '@stylistic/object-curly-spacing'            : [ error, 'always' ],
  '@stylistic/padding-line-between-statements' : [
    error,
    ...paddingLineBetweenStatements,
    {
      blankLine : 'always',
      next      : [ 'interface', 'type' ],
      prev      : '*',
    },
    {
      blankLine : 'always',
      next      : '*',
      prev      : [ 'interface', 'type' ],
    },
  ],
  '@stylistic/quotes'                      : [ error, 'single' ],
  '@stylistic/semi'                        : [ error, 'never' ],
  '@stylistic/space-before-blocks'         : error,
  '@stylistic/space-before-function-paren' : [
    error, {
      anonymous  : 'never',
      asyncArrow : 'always',
      named      : 'never',
    },
  ],
  '@stylistic/space-infix-ops'                     : error,
  '@typescript-eslint/array-type'                  : [ error, { default: 'generic' } ],
  '@typescript-eslint/class-methods-use-this'      : error,
  '@typescript-eslint/consistent-type-definitions' : off,
  '@typescript-eslint/consistent-type-exports'     : error,
  '@typescript-eslint/consistent-type-imports'     : [ error, { fixStyle: 'inline-type-imports' } ],
  '@typescript-eslint/default-param-last'          : error,
  '@typescript-eslint/dot-notation'                : error,
  '@typescript-eslint/member-ordering'             : [
    error, {
      'default' : {
        'optionalityOrder' : 'required-first',
        'order'            : 'natural-case-insensitive',
      },
    },
  ],
  '@typescript-eslint/method-signature-style' : error,
  '@typescript-eslint/naming-convention'      : [
    error,
    {
      format             : [ 'camelCase' ],
      leadingUnderscore  : 'allow',
      selector           : 'default',
      trailingUnderscore : 'forbid',
    },
    {
      format             : [ 'camelCase', 'PascalCase' ],
      leadingUnderscore  : 'allow',
      selector           : 'import',
      trailingUnderscore : 'forbid',
    },
    {
      format             : [ 'camelCase', 'UPPER_CASE', 'PascalCase' ],
      leadingUnderscore  : 'allow',
      selector           : 'variable',
      trailingUnderscore : 'forbid',
    },
    {
      format             : [ 'camelCase', 'PascalCase' ],
      leadingUnderscore  : 'allow',
      selector           : 'function',
      trailingUnderscore : 'forbid',
    },
    {
      format   : [ 'PascalCase' ],
      selector : 'typeLike',
    },
    {
      format   : [ 'camelCase', 'PascalCase' ],
      selector : [ 'objectLiteralMethod', 'objectLiteralProperty' ],
    },
  ],
  '@typescript-eslint/no-array-constructor'                   : error,
  '@typescript-eslint/no-confusing-void-expression'           : error,
  '@typescript-eslint/no-empty-function'                      : error,
  '@typescript-eslint/no-implied-eval'                        : warn,
  '@typescript-eslint/no-invalid-void-type'                   : error,
  '@typescript-eslint/no-loop-func'                           : error,
  '@typescript-eslint/no-shadow'                              : error,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare' : error,
  '@typescript-eslint/no-unnecessary-condition'               : error,
  '@typescript-eslint/no-unnecessary-qualifier'               : error,
  '@typescript-eslint/no-unnecessary-type-arguments'          : error,
  '@typescript-eslint/no-unused-expressions'                  : error,
  '@typescript-eslint/no-use-before-define'                   : error,
  '@typescript-eslint/no-useless-constructor'                 : error,
  '@typescript-eslint/no-useless-empty-export'                : error,
  '@typescript-eslint/prefer-literal-enum-member'             : error,
  '@typescript-eslint/prefer-readonly'                        : error,
  '@typescript-eslint/prefer-reduce-type-parameter'           : error,
  '@typescript-eslint/prefer-return-this-type'                : error,
  '@typescript-eslint/promise-function-async'                 : error,
  '@typescript-eslint/require-await'                          : error,
  '@typescript-eslint/sort-type-constituents'                 : error,
  '@typescript-eslint/strict-boolean-expressions'             : error,
  '@typescript-eslint/unified-signatures'                     : error,

  'class-methods-use-this' : off,
  'default-param-last'     : off,
  'dot-notation'           : off,
  'no-array-constructor'   : off,
  'no-empty-function'      : off,
  'no-implied-eval'        : off,
  'no-loop-func'           : off,
  'no-shadow'              : off,
  'no-unused-expressions'  : off,
  'no-use-before-define'   : off,
  'no-useless-constructor' : off,
  'require-await'          : off,
}

export default typescriptRules
