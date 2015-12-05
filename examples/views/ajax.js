'use strict'

const $ = require('jquery')
const ko = require('knockout')

class Ajax {
  constructor(ctx) {
    this.ctx = ctx
    this.page = ko.observable()
  }

  search() {
    // bubble up changes to router
    this.ctx.params.page(this.page())
  }
}

ko.components.register('ajax', {
  viewModel: Ajax,
  template:
  `
    <h3>Ajax</h3>
    <p>
      On this page you can go to any ejs file that was loaded into the 'pages' folder.<br>
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
      <input type="text" placeholder="Page..." data-bind="value: page">
      <button data-bind="click: search">Go</button>
    </p>
    <hr>
    <page params="page: page"></page>
  `
})

class Page {
  constructor(params) {
    this.page = params.page
    this.pageContent = ko.pureComputed(() => this.getPage()).extend({ async: false })
  }

  getPage() {
    return typeof this.page() === 'undefined'
      ? false
      : $.get(`/api/page/${this.page()}`)
  }
}

ko.components.register('page', {
  viewModel: Page,
  template:
  `
    <div data-bind="if: pageContent">
      <div data-bind="html: pageContent"></div>
    </div>
  `
})

ko.extenders.async = function(computedDeferred, initialValue) {
  const plainObservable = ko.observable(initialValue)
  let currentDeferred

  plainObservable.working = ko.observable(false)

  ko.computed(() => {
    if (currentDeferred) {
      currentDeferred.reject()
      currentDeferred = null
    }

    const newDeferred = computedDeferred()

    // chained promise, wait for fulfillment
    if (newDeferred &&
      (typeof newDeferred.done === 'function')) {

      plainObservable.working(true)

      currentDeferred = $.Deferred().done((data) => {
        plainObservable.working(false)
        plainObservable(data)
      })
      newDeferred.done(currentDeferred.resolve)
    } else {
      // real value, publish immediately
      plainObservable(newDeferred)
    }
  })

  return plainObservable
}
