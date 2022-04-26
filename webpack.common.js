module.exports = {
  entry: {
    map: './dist/map',
    radar: './dist/radar',
    sense: './dist/sense',
    triggerbot: './dist/triggerbot'
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/docs`
  }
};
