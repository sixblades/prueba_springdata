exports.config = {
  framework: 'jasmine2',
 
  baseUrl: 'http://127.0.0.1:9000',
  
  specs: ['../test/e2e/login_test.js'],
  capabilities: {
    'browserName': 'chrome'
  },
  
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
}