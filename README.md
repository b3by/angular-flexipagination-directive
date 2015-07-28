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

## How to use it
When including the directive into your html page, please include the following arguments:

* `displayable-results` an array that should be defined on the controller and will contain the chunk of results that can be displayed
* `original-request` the first request sent from the service in order to get the results (the controller will contact the service the first)
* `event-id` the event name that will be emitted from the controller when the first response is received
* `on-page-change` the request promise that will be fired from the component when changing result chunk
* `client-pagination` a flag that informs the component how to paginate the results