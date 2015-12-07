'use strict'

const $ = require('jquery')
const ko = require('knockout')

class ajax {
    constructor({article = ''}) {
      this.article = ko.observable('')
      if(article)
      {
        this.getPage(article, (r) => {this.article(r)})
      }
    }

    getPage(page, cb)
    {
      $.get(page).then((res) => {
          cb(res)
      })
    }
}

ko.components.register('ko-router-ajax', {
  viewModel: ajax,
  template:
  `
    <span data-bind="html: article"></span>
  `
})
