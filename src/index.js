'use strict'

const M = require('./markdown')
const ajax = require('./ajax')
const ko = require('knockout')
const router = require('./router')

ko.components.register('ko-component-router', {
  viewModel: router,
  template:
    `
    <div data-bind='if: ctx.component'>
      <div data-bind='component: {
        name: ctx.component,
        params: ctx
      }'></div>
    </div>`
})

ko.components.register('ko-router-markdown', {
  viewModel: M,
  template:
  `
    <span data-bind="html: text()"></span>
  `
})

ko.components.register('ko-router-ajax', {
  viewModel: ajax,
  template:
  `
    <span data-bind="html: article"></span>
  `
})
