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