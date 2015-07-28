# angular-flexipagination-directive
Yet another pagination directive for Angular. It supports both client-side and server-side pagination, and provides client level buffering.

## Installation
If you want to install the directive with bower, simply type into your working directory the bower command.

```
bower install angular-flexipagination-directive
```
### Running the example
In order to run the example locally on your machine, just clone this repository, then install all the required dependencies with `npm install`.

If you are on OS X or linux, simply run `npm start`, then go to `127.0.0.1:8888/example` in order to check the working example.

If you are on Windows, set the variable `SERVE_THIS_FOLDER` to the root directory of the repository
(something like `set SERVE_THIS_FOLDER=your\path\angular-flexipagination-directive)`, then run the `serve-this` binary in the node_modules folder.

## Testing
So far, just e2e testing has been implemented for the directive. You just need an instance of webdriver-manager, then you just type `grunt test`.

## How it works
This directive provides 2 different ways of organizing data into different pages: client-side and server-side pagination.

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

Please note that **all the available page sizes should be exact submultiples of the selected buffer size**.

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