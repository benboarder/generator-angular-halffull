'use strict';
var util = require('util'),
    ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator(){
  ScriptBase.apply(this, arguments);

  // remove the suffix ctrl
  if(this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl'){
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles(){
  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    'controllers',
    this.options['skip-add'] || false
  );
};
