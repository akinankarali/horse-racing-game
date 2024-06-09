module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
