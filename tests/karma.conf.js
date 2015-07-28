// Karma configuration
// Generated on Fri Jul 24 2015 17:23:30 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
        './../bower_components/angular/angular.js',
        './../node_modules/angular-mocks/angular-mocks.js',
        './../src/directives/angular-flexipagination-directive.js',
        './../example/js/controllers.js',
        './../example/js/services.js',
        './../example/js/app.js',
        './unit/*.js'
    ],

    exclude: [ ],

    preprocessors: { },

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'Firefox'],

    singleRun: false
  })
}
