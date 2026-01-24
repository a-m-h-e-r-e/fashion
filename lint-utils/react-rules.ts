/* eslint-disable @typescript-eslint/naming-convention,sort-keys */
import { error, off, warn } from './error-levels'

const reactRules = {
  'react/boolean-prop-naming'           : [ error, { validateNested: true } ],
  'react/destructuring-assignment'      : [ error, 'always', { destructureInSignature: 'always' } ],
  'react/function-component-definition' : [
    off, {
      namedComponents   : [ 'arrow-function', 'function-declaration' ],
      unnamedComponents : [ 'arrow-function', 'function-expression' ],
    },
  ],
  'react/hook-use-state'               : [ error, { allowDestructuredState: true } ],
  'react/iframe-missing-sandbox'       : error,
  'react/jsx-closing-bracket-location' : [ error, 'line-aligned' ],
  'react/jsx-closing-tag-location'     : error,
  'react/jsx-curly-brace-presence'     : [ error, 'never' ],
  'react/jsx-curly-newline'            : [
    error, {
      multiline  : 'require',
      singleline : 'forbid',
    },
  ],
  'react/jsx-curly-spacing'       : [ error, 'always' ],
  'react/jsx-equals-spacing'      : [ error, 'never' ],
  'react/jsx-first-prop-new-line' : [ error, 'multiline' ],
  'react/jsx-handler-names'       : [ error, { checkLocalVariables: true } ],
  'react/jsx-indent-props'        : [ error, 2 ],
  'react/jsx-max-depth'           : [ error, { max: 10 } ],
  'react/jsx-max-props-per-line'  : [
    error, {
      maximum : {
        multi  : 1,
        single : 3,
      },
    },
  ],
  'react/jsx-no-constructed-context-values' : warn,
  'react/jsx-no-leaked-render'              : error,
  'react/jsx-no-script-url'                 : error,
  'react/jsx-no-useless-fragment'           : error,
  'react/jsx-pascal-case'                   : [ error, { allowNamespace: true } ],
  'react/jsx-sort-props'                    : error,
  'react/jsx-tag-spacing'                   : error,
  'react/jsx-wrap-multilines'               : [
    error, {
      'arrow'       : 'parens-new-line',
      'assignment'  : 'parens-new-line',
      'condition'   : 'parens-new-line',
      'declaration' : 'parens-new-line',
      'logical'     : 'parens-new-line',
      'prop'        : 'parens-new-line',
      'return'      : 'parens-new-line',
    },
  ],
  'react/no-array-index-key'            : warn,
  'react/no-children-prop'              : error,
  'react/no-danger'                     : warn,
  'react/no-invalid-html-attribute'     : error,
  'react/no-multi-comp'                 : error,
  'react/no-namespace'                  : error,
  'react/no-unstable-nested-components' : [ error, { allowAsProps: true } ],
  'react/react-in-jsx-scope'            : off,
  'react/self-closing-comp'             : error,
  'react/style-prop-object'             : error,
  'react/prop-types'                    : off,
  'react/void-dom-elements-no-children' : error,
}

export default reactRules
