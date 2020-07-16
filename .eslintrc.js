module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"commonjs": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"globals": {
		"require": true,
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"semi": 0,
		"no-unused-vars": 0,
		"react/prop-types": 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/ban-types': 0
	}
};
