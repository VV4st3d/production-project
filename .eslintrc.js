module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    // "overrides": [
    //     {
    //         "env": {
    //             "node": true
    //         },
    //         "files": [
    //             ".eslintrc.{js,cjs}"
    //         ],
    //         "parserOptions": {
    //             "sourceType": "script"
    //         }
    //     }
    // ],
    parser: '@typescript-eslint/parser',
    plugins: ["@typescript-eslint"],
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension

            // As mentioned in the comments, you should extend TypeScript plugins here,
            // instead of extending them outside the `overrides`.
            // If you don't want to extend any rules, you don't need an `extends` attribute.
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],

            parserOptions: {
                project: ['tsconfig.json'], // Specify it only for TypeScript files
            },
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    // "plugins": [
    //     "react"
    // ],
    "rules": {
        'react/jsx-indent': [2, 4],
        "react/jsx-filename-extension": [2, {"extensions": [".js", ".jsx", ".tsx"]}],
        'import/no-unresolved': 'off',
        '@typescript-eslint/explicit-function-return-type':'off',
        "require-await": "off"
    },
    globals: {
        '__IS_DEV__': true
    }
}
