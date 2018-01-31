

// webpack.config.js
const path = require('path'); // NOTE: We require path because we use it below
const ManifestPlugin = require('webpack-manifest-plugin');
 

module.exports = {

  entry: [
    path.resolve(__dirname, 'src/main.js')
  ], // IMPORTANT: We changed the path to match our new index.js location

  output: {
    path: path.resolve(__dirname+ '/dist'), // [3]
    filename: 'bundle.js',
    publicPath: '/'
  },
	devServer: {
	  contentBase: "./src",
	  inline: true,
	  port: 8080
	},
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },{
           test: /\.html$/,
           loader: 'html'
          }
      ]
   },
  plugins: [
    new ManifestPlugin()
  ]

};
