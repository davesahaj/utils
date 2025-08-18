import pluginJs from '@eslint/js'
import eslint from '@eslint/js'
import checkFile from 'eslint-plugin-check-file'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    plugins: {
      tseslint,
      'simple-import-sort': simpleImportSort,
      checkFile: checkFile,
      eslintPluginPrettierRecommended,
    },
    rules: {
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'warn',
      '@/no-unused-vars': 'error',
      '@/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            ['^next', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@your-lib/*', '@your-lib', 'your-lib'],
              message: 'Direct Library imports are disabled. Please import from @/libs',
            },
          ],
        },
      ],
      'checkFile/filename-naming-convention': [
        'error',
        {
          './src/**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
        },
      ],
    },
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  eslint.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  pluginReactConfig,
  pluginJsxRuntime
]
