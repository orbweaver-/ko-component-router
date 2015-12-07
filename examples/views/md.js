'use strict'

const ko = require('knockout')
require('../../src')

class Markdown {
  constructor(){
    let s =
    `
    #DONT PANIC
    This is only a test of the
    __markdown system__
    `
    this.text = ko.observable(s)
  }
}

ko.components.register('markdown', {
  viewModel: Markdown,
  template: `
    <ko-router-markdown params="text: text()"></ko-router-markdown>
  `
})