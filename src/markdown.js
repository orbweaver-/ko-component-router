'use strict'

const ko = require('knockout')
const marked = require('marked')

class M {
  constructor({text = ''}) {
    this.text = ko.observable()
    if((typeof text).toString() == 'function') return this.text(marked(text()))
    return this.text(marked(text))
  }
}

ko.components.register('ko-router-markdown', {
  viewModel: M,
  template: `
    <span data-bind="html: text()"></span>
  `
})
