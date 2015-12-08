'use strict'

const ko = require('knockout')
require('../../src')

const api = 'http:' + window.location.origin.split(':')[1] + ':8081/page/'

class Ajax {
  constructor() {
    this.query = ko.observable()
  }
  search()
  {
    if(!this.query()) return
    history.pushState({}, 'ko-comp', '/ajax/'+this.query())
    history.pushState({}, 'ko-comp', '/ajax/'+this.query())
    history.back()
  }
}

ko.components.register('ajax', {
  viewModel: Ajax,
  template: `
    <h3>Ajax</h3>
    <p>
      On this page you can go to any html file that was loaded into the 'pages' folder.<br>
    </p>
    <p><b>Function</b>: ajax</p>
    <p><b>Description</b>: allows html pages to be dynamically loaded into the DOM by the use of $.get()</p>
    <p><b>Usage</b>: In the constructor for the view model define a 'this.article' variable, and set it to
      the web address and path that you want to retrieve the HTML from. <br>
    </p>
    <p>In this example, a seperate server is set up on port 8081 and serves pages from the 'pages' folder.<br></p>
    <p><b>type 'one' in the search box and click Go</b></p>
    <br>
    <br>
    <p>
      <input type="text" placeholder="Page..." data-bind="value: query">
      <button data-bind="click: search()">Go</button>
    </p>
  `
})

class pageSearch {
  constructor(ctx){
    this.article = ko.observable(api + ctx.params.page())
  }
}

ko.components.register('pageSearch', {
  viewModel: pageSearch,
  template: `
    <ko-component-router params="article: article"></ko-component-router>
  `
})
