'use strict';
var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator(){
      yeoman.generators.Base.apply(this, arguments);
    };

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv(){
  this.sourceRoot(path.join(__dirname, '../templates/common/root'));
  this.copy('.bowerrc', '.bowerrc');
  this.copy('.editorconfig', '.editorconfig');
  this.copy('.ftppass', '.ftppass');
  this.copy('.jsbeautifyrc', '.jsbeautifyrc');
  this.copy('.jshintrc', '.jshintrc');
  this.copy('bs-config.js', 'bs-config.js');
  this.copy('cmd.exe', 'cmd.exe');
  this.copy('info.md', 'info.md');
  this.copy('Procfile', 'Procfile');
  this.copy('gitignore', '.gitignore');
  this.directory('../test', 'test', true);

  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.copy('app/.buildignore');
  this.copy('app/.htaccess');
  this.copy('app/404.html');
  this.copy('app/favicon.ico');
  this.copy('app/robots.txt');
  this.copy('app/humans.txt');
  this.copy('app/views/main.html');
  this.directory('app/images');
};
