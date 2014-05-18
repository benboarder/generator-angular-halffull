'use strict';
var util = require('util'),
    ScriptBase = require('../script-base.js'),
    Generator = module.exports = function Generator(){
      ScriptBase.apply(this, arguments);
    };

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles(){
  this.generateSourceAndTest(
    'service/constant',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );
};
