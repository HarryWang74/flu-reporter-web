module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'https://www.google.com/jsapi/',
      '_site/javascripts/vendors.min.js',
      '_site/javascripts/application.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};