module.exports = {
  entry: ['whatwg-fetch', './favorite.js'],
  output: {
    path: __dirname,
    filename: 'favorite.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
