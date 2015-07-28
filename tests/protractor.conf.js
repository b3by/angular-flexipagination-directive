exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  multiCapabilities: [
    {
      browserName: 'chrome'
    }
  ],

  specs: [ './e2e/protractor-spec.js' ],

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
    defaultTimeoutInterval: 30000
  }

};
