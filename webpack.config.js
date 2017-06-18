var webpack = require('webpack'),
    path = require( 'path' );

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: 'js-meters.js',
    library: 'jsMeters',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      "./src"
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ['es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { 
        test: /\.ts$/, 
        loader: "ts-loader" 
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  externals: {
    'cheerio': 'window'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
};
