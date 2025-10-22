import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const tsconfig = tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	}
)

export default [
	...tsconfig,
	stylistic.configs['recommended'],
	stylistic.configs.customize({
		indent: 4,
		jsx: false,
		semi: false,
		commaDangle: 'never',
		braceStyle: '1tbs'
	}),
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		rules: {
			'@typescript-eslint/no-magic-numbers': 'off',
			'@typescript-eslint/max-params': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-unsafe-type-assertion': 'warn',
			'@typescript-eslint/no-unsafe-return': 'warn',
			'@typescript-eslint/no-unnecessary-type-parameters': 'off',
			'@typescript-eslint/no-deprecated': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unnecessary-condition': 'warn',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true
				}
			]
		}
	}
]
