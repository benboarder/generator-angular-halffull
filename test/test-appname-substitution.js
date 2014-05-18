/*global describe, before, it, beforeEach */
'use strict';

var fs = require('fs'),
    assert = require('assert'),
    path = require('path'),
    util = require('util'),
    generators = require('yeoman-generator'),
    helpers = require('yeoman-generator').test;

describe('Angular generator template mechanism', function (){
  var angular,
      appName = 'upperCaseBug';

  beforeEach(function (done){
    var deps = [
      '../../../app',
      '../../../common',
      '../../../controller',
      '../../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
      ]
    ];
    helpers.testDirectory(path.join(__dirname, 'temp', appName), function (err){
      if(err){
        done(err);
      }
      angular = helpers.createGenerator('angular:app', deps, [appName], {
        'skip-welcome-message': true,
        'skip-install': true,
        'skip-message': true
      });
      done();
    });
  });

  it('should generate the same appName in every file', function (done){
    var expected = [
      'app/scripts/app.js',
      'app/scripts/controllers/main.js',
      'app/index.html',
      'test/spec/controllers/main.js'
    ];

    helpers.mockPrompt(angular, {
      compass: true,
      bootstrap: true,
      compassBootstrap: true,
      modules: []
    });

    angular.run({}, function (){
      // check if all files are created for test
      helpers.assertFile(expected);

      // read JS files
      var app_js = fs.readFileSync('app/scripts/app.js', 'utf8'),
          main_js = fs.readFileSync('app/scripts/controllers/main.js', 'utf8'),
          main_test_js = fs.readFileSync('test/spec/controllers/main.js', 'utf8');

      // test JS files
      var regex_js = new RegExp('module\\(\'' + appName + 'App\'');

      assert.ok(regex_js.test(app_js), 'app.js template using a wrong appName');
      assert.ok(regex_js.test(main_js), 'main.js template using a wrong appName');
      assert.ok(regex_js.test(main_test_js), 'controller spec template using a wrong appName');

      // read HTML file
      var index_html = fs.readFileSync('app/index.html', 'utf8');

      // test HTML file
      var regex_html = new RegExp('ng-app=\"' + appName + 'App\"');
      assert.ok(regex_html.test(index_html), 'index.html template using a wrong appName');
      done();
    });
  });
});
