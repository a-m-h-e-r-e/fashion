/* eslint-disable @typescript-eslint/naming-convention */
import { error } from './error-levels'

const vitestRules = {
  'max-nested-callbacks'                 : [ error, 5 ],
  'vitest/consistent-test-filename'      : error,
  'vitest/consistent-test-it'            : [ error, { 'fn': 'it' } ],
  'vitest/no-alias-methods'              : error,
  'vitest/no-conditional-expect'         : error,
  'vitest/no-conditional-in-test'        : error,
  'vitest/no-conditional-tests'          : error,
  'vitest/no-duplicate-hooks'            : error,
  'vitest/no-mocks-import'               : error,
  'vitest/no-standalone-expect'          : error,
  'vitest/prefer-comparison-matcher'     : error,
  'vitest/prefer-each'                   : error,
  'vitest/prefer-equality-matcher'       : error,
  'vitest/prefer-expect-resolves'        : error,
  'vitest/prefer-hooks-in-order'         : error,
  'vitest/prefer-hooks-on-top'           : error,
  'vitest/prefer-lowercase-title'        : error,
  'vitest/prefer-mock-promise-shorthand' : error,
  'vitest/prefer-spy-on'                 : error,
  'vitest/prefer-strict-equal'           : error,
  'vitest/prefer-to-be-falsy'            : error,
  'vitest/prefer-to-be-object'           : error,
  'vitest/prefer-to-be-truthy'           : error,
  'vitest/prefer-to-contain'             : error,
  'vitest/prefer-to-have-length'         : error,
  'vitest/require-hook'                  : error,
}

export default vitestRules
