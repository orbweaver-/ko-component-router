'use strict'

const ko = require('knockout')
const md = require('marked')

class M {
  constructor({text = ''}) {
    this.text  = ko.observable(md(text()))
  }
}

ko.components.register('ko-router-markdown', {
  viewModel: M,
  template:
  `
    <span data-bind="html: text()"></span>
  `
})
