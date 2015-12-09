'use strict'

const fs = require('fs')
const app = require('express')()
const api = require('express')()
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

app.use(webpackDevMiddleware(compiler, { noInfo: true }))
app.get(/node_modules/, (req, res) => res.sendFile(path.resolve(__dirname, '..', req.path.substring(1))))
app.get('*',            (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))
app.listen(8080, () => { console.log('Examples running at localhost:8080') })


//api settings
api.set('views', __dirname + '/pages')

api.engine('html', require('ejs').renderFile)
api.engine('txt', require('ejs').renderFile)
api.set('view engine', 'html')

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


api.get('/page/:id', (req, res) => {
  const url = path.resolve(__dirname, 'pages/' + req.params.id)
  fs.stat(url+ '.html', (err, stats) => {
    if (stats)
      res.render(url)
    else
      res.render(path.resolve(__dirname, 'pages/404'))
  })
})
api.listen(8081, () => { console.log('API running at localhost:8081') })
