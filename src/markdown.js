'use strict'

const ko = require('knockout')
const md = require('marked')

class Md {
  constructor({text = ''}) {
    this.text  = ko.observable(md(text()))
  }
}

module.exports = Md
