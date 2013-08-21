// Karma configuration
// Generated on Wed Aug 21 2013 17:55:37 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // Don't use html2js preprocessor for html files.
    preprocessors: {
      '**/*.html': []
    },


    // list of files / patterns to load in the browser
    files: [
      // included: false -> Load these files with RequireJS instead.
      {pattern: 'app/*.js', included: false},
      // Load all .js files not in components folder.
      {pattern: 'app/!(components)/*.js', included: false},
      // Load templates.
      {pattern: 'app/templates/*.html', included: false},
        // Load component dependencies.
      {pattern: 'app/components/backbone/backbone.js', included: false},
      {pattern: 'app/components/jquery/jquery.js', included: false},
      {pattern: 'app/components/underscore/underscore.js', included: false},
      {pattern: 'app/components/requirejs-text/text.js', included: false},

      {pattern: 'test/**/*Spec.js', included: false},

      'test/test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'app/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
