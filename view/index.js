'use strict';
var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(){
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates/common'));

  if(typeof this.env.options.appPath === 'undefined'){
    try{
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    }catch (e){}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles(){
  this.template(
    'app/views/view.html',
    path.join(
      this.env.options.appPath,
      'views',
      this.name.toLowerCase() + '.html'
    )
  );
};
