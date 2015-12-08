'use strict'

const ko = require('knockout')
require('../../src')

class Markdown {
  constructor(){
    let s = "# DON'T PANIC\n"
    s +=  "This is only a test of the  __markdown system__, using the [Marked](https://github.com/chjj/marked.git) module"
    this.text = ko.observable(s)
  }
}

ko.components.register('markdown', {
  viewModel: Markdown,
  template: `
    <ko-router-markdown params="text: text"></ko-router-markdown>
  `
})
