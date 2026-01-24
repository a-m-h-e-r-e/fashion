/* eslint-disable */
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import reactRules from './lint-utils/react-rules'
import typescriptRules from './lint-utils/typescript-rules'
import commonRules from './lint-utils/common-rules'

export default defineConfig( [
  {
    ignores : [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/**',
      '.next/**',
      '*.config.js',
    ],
  },
  {
    files : [ '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
    plugins :
    {
      js,
      '@stylistic' : stylistic,
    },
    extends         : [ 'js/recommended' ],
    languageOptions : {
      globals       : globals.browser,
      parserOptions : {
        projectService  : { allowDefaultProject: [ 'eslint.config.mts', 'vitest.config.mts' ] },
        tsconfigRootDir : import.meta.dirname,
      },
    },
    rules : {
      ...reactRules as any,
      ...typescriptRules as any,
      ...commonRules as any,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { settings: { react: { version: 'detect' } } },
] )
