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
  template:
  `
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
    this.ready = ko.observable(false)
    this.article = api + ctx.params.page()
    //this.article = ko.observable()
    this.params = ctx.params
    //getPage((api + "one"), (r) => {this.article(r)})
  }
}

ko.components.register('pageSearch', {
  viewModel: pageSearch,
  template:
  `
    <ko-router-ajax params="article: article"></ko-router-ajax>
  `
  //<ko-component-router params="article: article"></ko-component-router>
  //ajaxTemplate: (api + 'one')
  //template: ko.router.get(api + 'one')
})
