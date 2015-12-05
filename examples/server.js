'use strict'

const app = require('express')()
const api = require('express')()
const log = global.console.log
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const compiler = webpack({
  entry: path.resolve(__dirname, 'app.js'),

  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  },

  devtool: 'eval-source-map'
})

api.get('/page/:id', (req, res) => res.sendFile(path.resolve(__dirname, 'pages', req.params.id)))
app.use('/api', api)

app.use(webpackDevMiddleware(compiler, { noInfo: true }))
app.get(/node_modules/, (req, res) => res.sendFile(path.resolve(__dirname, '..', req.path.substring(1))))
app.get('*',            (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))
app.listen(8080, () => { log('Examples running at localhost:8080') })
