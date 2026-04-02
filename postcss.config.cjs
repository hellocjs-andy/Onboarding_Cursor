module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // postcss-pxtorem disabled for now: legacy CSS uses raw px values designed for fixed
    // viewport. Re-enable after adding a dynamic rem-base script (e.g. amfe-flexible).
    // 'postcss-pxtorem': {
    //   rootValue: 100,
    //   propList: ['*'],
    //   exclude: /node_modules/i,
    // },
  },
};
