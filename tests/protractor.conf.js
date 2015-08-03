exports.config = {

  baseUrl: 'http://' + (process.env.CI ? 'ngadmin' : 'localhost') + ':8000',

  seleniumAddress: 'http://localhost:4444/wd/hub',

  multiCapabilities: [
    {
      browserName: 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER ? process.env.TRAVIS_JOB_NUMBER : null,
      name: 'ng-admin'
    }
  ],

  specs: [ './e2e/protractor-spec.js' ],

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  framework: 'jasmine2',

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: false}));
  },

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: false,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 360000
  }

};
