'use strict'

const marked = require('marked')
const $ = require('jquery')

function getPage(page, cb) {$.get(page).then((res) => cb(res))}

module.exports = (md, article, cb) => {
    getPage(article(), (r) => {
      if(!md) return cb(r)
      r = marked(r)
      return cb(r)
    })
}
