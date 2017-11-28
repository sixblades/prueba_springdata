// Karma configuration
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/modernizr/modernizr.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/json3/lib/json3.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ui-router-extras/release/ct-ui-router-extras.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-cache-buster/angular-cache-buster.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js',
      'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
      'bower_components/chai/chai.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-scenario/angular-scenario.js',
      // endbower
      
      'dist/scripts/main.*.js',
      'dist/scripts/components.*.js',
      'dist/scripts/vendor.*.js',
      'test/spec/**/allocation.controller.spec.js'
    ],
    // list of files / patterns to exclude
    exclude: ['karma.config.js'],

    // web server port
    port: 9000,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};