'use strict'

const ko = require('knockout')
require('../../src')

const api = window.location.origin.split(':')[0] + ':' + window.location.origin.split(':')[1] + ':8081/page/'

class fourOhfour {
  constructor(){
    this.article = ko.observable(api + '404')
  }
}

ko.components.register('404', {
  viewModel: fourOhfour,
  template: `
    <ko-component-router params="article: article"></ko-component-router>
  `
})
