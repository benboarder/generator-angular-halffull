'use strict';
var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator(){
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile(){
  this.angularModules = this.env.options.angularDeps;
  this.ngRoute = this.env.options.ngRoute;
  this.appTemplate('app', 'scripts/app');
};
