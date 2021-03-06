const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
  ENV: ENV
});


module.exports = function (options) {
  return webpackMerge(commonConfig({ env: ENV }), {

    devtool: 'inline-source-map',

    output: {
      path: helpers.root('dist/bundles'),
      publicPath: '/',
      filename: '[name].umd.js',
      library: 'ontimize-web-ngx-dynamicform',
      libraryTarget: 'umd'
    },

    module: {
      loaders: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['style-loader', 'css-loader', 'sass-loader'],
        })
      },
      ],

      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'tslint-loader',
          options: {
            configFile: 'tslint.json'
          }
        }
        ],
        exclude: [helpers.root('node_modules'), /\.(spec|e2e)\.ts$/, '@angular/compiler']
      }
      ]
    },

    plugins: [

      new LoaderOptionsPlugin({
        debug: true,
        options: {
        }
      })
    ]
  });
}
