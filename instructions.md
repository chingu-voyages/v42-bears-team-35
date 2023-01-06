# Instructions on installing and configuring ESLINT

## Configuring ESLINT

run:

```cmd
npm i -D eslint
npx eslint --init
npx install-peerdeps --dev eslint-config-airbnb
npm install -D eslint-config-airbnb-typescript
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

choose "To check syntax, find problems, and enforce code style"\
choose "JavaScript modules (import/export)"\

Make sure you have the following dev dependencies versioning may vary depending on date:

```JSON
{
   "devDependencies": {
        ...,
        "@typescript-eslint/eslint-plugin": "^5.47.1",
        "@typescript-eslint/parser": "^5.47.1",
        "eslint": "^8.30.0",
        "eslint-config-airbnb": "^19.0.4",
        "eslint-config-airbnb-typescript": "^17.0.0",
        "eslint-config-react-app": "^7.0.1",
        "eslint-plugin-import": "^2.26.0",
        "eslint-plugin-jsx-a11y": "^6.6.1",
        "eslint-plugin-react": "^7.31.11",
        "eslint-plugin-react-hooks": "^4.6.0"
   }
}
```

Make sure your .eslintrc.cjs file looks like this:

```JavaScript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-uses-react": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-props-no-spreading": ["warn"],
    "no-shadow": "off",
  },
};
```

Make sure to add the following to your scripts

```JSON

"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
},
```

run `npm run lint`\
&& `npm run lint:fix`\
This will check for all the problems and fix most of them, and finally you should manualy fix the rest of issues find

run

```cmd
npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Add the following to the .eslintrc.cjs inside the extends section

```JSON
"plugin:prettier/recommended"
```

in the plugins section add as the last one of the array:

```JSON
"prettier"
```

on the project's root directory create the `.prettierrc` file which will hold the specifications with which the prettier dependency will check the file

```JSON
{
    "tabWidth": 4,
    "useTabs": false,
    "semi": false,
    "singleQuote": false,
    "trailingComma": "all",
    "printWidth": 80
}
```

Make sure to have `Lintel: ESLint Configuration File Visualizer` extension installed on your VS Code

## Making sure you run lint before every commit

from the website `https://typicode.github.io/husky/#/`

create the `.husky` directory in the root of the project

run

```cmd
npx husky-init && npm install
```

to configure precommit run:

```cmd
npx husky set .husky/pre-commit "npm run lint"
```
