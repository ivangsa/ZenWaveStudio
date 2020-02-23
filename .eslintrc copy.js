module.exports = {
    extends: [
        'plugin:vue/recommended'
    ],
    rules: {
        "vue/html-indent": ["warn", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 5,
            "multiline": {
              "max": 5,
              "allowFirstLine": false
            }
          }]
    }
}
