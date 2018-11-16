module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true
    },
    "rules": {
        "no-param-reassign": [2, { "props": false }],
        "no-return-assign": [2,"except-parens"],
        "no-use-before-define": ["error", { "functions": false, "classes": true }]
    }
};



