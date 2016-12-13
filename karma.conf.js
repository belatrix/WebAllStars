// Karma configuration
// Generated on Tue Nov 15 2016 08:03:59 GMT-0500 (PET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "./source/js/lib/angular/angular.js",  
      "./source/js/lib/angular-animate/angular-animate.js",  
      "./source/js/lib/angular-material/angular-material.js",
      "./source/js/lib/angular-aria/angular-aria.js",
      "./source/js/lib/angular-material-icons/angular-material-icons.min.js",
      "./source/js/lib/angular-messages/angular-messages.js",
      "./source/js/lib/angular-resource/angular-resource.js",
      "./source/js/lib/angular-route/angular-route.js",
      "./source/js/lib/angular-sanitize/angular-sanitize.js",
      "./source/js/lib/angular-translate/angular-translate.js",
      "./source/js/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "./source/js/lib/angular-ui-router/angular-ui-router.js",
      "./source/js/lib/ngstorage/ngStorage.js",
      "./source/js/lib/underscore/underscore.js",
      "./node_modules/angular-mocks/angular-mocks.js",      
      "./source/js/app/module/*.js",
      "./source/js/app/**/*.js",    
      "./source/js/app/config/test/controller/login.ctrl.spec.js"         
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
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


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
