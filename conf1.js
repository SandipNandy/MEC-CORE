// An example configuration file.
//var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    //directConnect: true,
  
    // Capabilities to be passed to the webdriver instance.
    /*capabilities: {
      'browserName': 'chrome',
    },*/
  
    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',
  
    // Spec patterns are relative to the current working directory when
    // protractor is called.
    multiCapabilities: [
      {
        //'browserName': 'firefox'
        "browserName": "chrome",
        "chromeOptions": {
          'binary': "..\\Google\\Chrome1\\Application\\chrome.exe",  
      },
        logName:"MEC CORE :- ",
        seleniumAddress: 'http://localhost:4444/wd/hub',
        specs: ['MECSanityNewQA.js'],
          },
    ],
    
  
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
      defaultTimeoutInterval: 2000000
    },
    onPrepare: function () {
      // jasmine.getEnv().addReporter(reporter);
       var AllureReporter = require('C:/Users/SandipNandi/AppData/Roaming/npm/node_modules/jasmine-allure-reporter');
       jasmine.getEnv().addReporter(new AllureReporter({
         resultsDir: 'allure-resultsMEC'
       }));
       jasmine.getEnv().afterEach(function(done){
         browser.takeScreenshot().then(function (png) {
           allure.createAttachment('Screenshot', function () {
             return new Buffer(png, 'base64')
           }, 'image/png')();
           done();
         })
       });
    
    }
   
    
  };
