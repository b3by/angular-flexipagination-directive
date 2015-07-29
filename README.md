[![Build Status](https://travis-ci.org/b3by/angular-flexipagination-directive.svg?branch=master)](https://travis-ci.org/b3by/angular-flexipagination-directive)
[![Dependency Status](https://gemnasium.com/b3by/angular-flexipagination-directive.svg)](https://gemnasium.com/b3by/angular-flexipagination-directive)
[![Bower version](https://badge.fury.io/bo/angular-flexipagination-directive.svg)](http://badge.fury.io/bo/angular-flexipagination-directive)

# angular-flexipagination-directive
Yet another pagination directive for Angular. It supports both client-side and server-side pagination, and provides client level buffering.

## Installation
If you want to install the directive with bower, simply type into your working directory the bower command.

```
bower install angular-flexipagination-directive
```
### Running the example
In order to run the example locally on your machine, just clone this repository, then install all the required dependencies with `npm install`.
When done, just run `npm start`, then navigate to `localhost:8888` (the example is serverized by [this awesome packet](https://github.com/helloIAmPau/serve-this)
by [helloIAmPau](https://github.com/helloIAmPau), and the configurations can be found in the `package.json` file).

## Testing
Several grunt task have been defined for testing purpose (it's still a work in progress). You can run unit testing, e2e testing or both. For continuous testing,
just the unit testing has been specified.

* `grunt unitTest` will execute karma testing once
* `grunt e2eTest` will execute protractor testing once (please make sure that a webdriver-manager instance is running)
* `grunt fullTest` will execute both karma and protractor testing once
* `grunt testDev` will execute karma testing not in single run mode
* `grunt` will just call the full test task

## How it works
This directive provides 2 different ways of organizing data into separate pages: client-side and server-side.

### Server-side pagination
If the `client-pagination` flag is set to `false`, each request will contain an extra object for pagination parameters.

```
generalRequest.pagination = {
  limit: 100,
  offset: 0
}
```

The server should be able to paginate the results and, according to the above example, send 100 results (limit) starting from zero (offset),
along with the total result count.

```
generalResponse = {
  count: 237,
  results: { ... }
}
```

Please note that **all the available page sizes should be exact submultiples of the selected buffer size**,
otherwise a lot of cute kitties are going to cry.

The client will paginate the buffered results, and no more requests will be sent to the server until the buffer is over.

### Client-side pagination
If the `client-pagination` flag is set to `true`, the client will send a request to the server without any pagination coordinates.
In this case, the client will just retrieve the results and paginate them *old school* (it might be quite memory-consuming, so beware).

## How to use it
When including the directive into your html page, please include the following arguments:

* `displayable-results` an array that should be defined on the controller and will contain the chunk of results that can be displayed
* `original-request` the request that should be sent from the directive to the service
* `on-page-change` the request promise that will be fired from the component when changing result chunk
* `client-pagination` a flag that informs the component how to paginate the results
