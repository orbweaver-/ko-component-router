'use strict'

const ko = require('knockout')
require('../../src')

const api = window.location.origin.split(':')[0] + ':' + window.location.origin.split(':')[1] + ':8081/page/'

class MdAjax {
  constructor(){
    this.article = ko.observable(api + 'md')
  }
}

ko.components.register('mdajax', {
  viewModel: MdAjax,
  template: `
    <ko-component-router params="article: article, markdown: true"></ko-component-router>
  `
})
