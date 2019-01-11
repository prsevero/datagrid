module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [
      "warn",
      {
        "bracketSpacing": false,
        "singleQuote": true,
        "tabWidth": 4,
        "trailingComma": "all"
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
