'use strict';
var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    angularUtils = require('../util.js'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    art = require('../util/art'),
    Logger = require('../util/log'),
    wiredep = require('wiredep');

var Generator = module.exports = function Generator(args, options){
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });

  this.env.options['app-suffix'] = this.options['app-suffix'];
  this.scriptAppName = this.appname + angularUtils.appName(this);

  this.option('log', {
    desc: 'The log verbosity level: [ verbose | log | warn | error ]',
    defaults: 'log',
    alias: 'l',
    name: 'level'
  });
  this.logger = new Logger({level: this.options.log});

  args = ['main'];

  if(typeof this.env.options.appPath === 'undefined'){
    try{
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    }catch(e){}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  if(typeof this.env.options.coffee === 'undefined'){
    this.option('coffee', {
      desc: 'Generate CoffeeScript instead of JavaScript'
    });

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if(!this.options.coffee &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0){
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  this.hookFor('angular:common', {
    args: args
  });

  this.hookFor('angular:main', {
    args: args
  });

  this.hookFor('angular:controller', {
    args: args
  });

  this.on('end', function (){
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: this._injectDependencies.bind(this)
    });

    var enabledComponents = [];

    if(this.resourceModule){
      enabledComponents.push('angular-resource/angular-resource.js');
    }

    if(this.cookiesModule){
      enabledComponents.push('angular-cookies/angular-cookies.js');
    }

    if(this.sanitizeModule){
      enabledComponents.push('angular-sanitize/angular-sanitize.js');
    }

    if(this.routeModule){
      enabledComponents.push('angular-route/angular-route.js');
    }

    this.invoke('karma:app', {
      options: {
        coffee: this.options.coffee,
        travis: true,
        'skip-install': this.options['skip-install'],
        components: [
          'angular/angular.js',
          'angular-mocks/angular-mocks.js'
        ].concat(enabledComponents)
      }
    });

    if(this.env.options.ngRoute){
      this.invoke('angular:route', {
        args: ['about']
      });
    }
  });

  this.pkg = require('../package.json');
  this.authorname = this.pkg.author;
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome(){
  this.logger.log(art.hfsStartArt, {logPrefix: ''});
  if(!this.options['skip-welcome-message']){
    this.log(
      'I got Bootstrap and recommended AngularJS modules.\n'
    );
  }
};

Generator.prototype.askForCompass = function askForCompass(){
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: true
  }], function (props){
    this.compass = props.compass;

    cb();
  }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap(){
  var compass = this.compass;
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Twitter Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: '...the Sass version?',
    default: true,
    when: function (props){
      return props.bootstrap && compass;
    }
  }], function (props){
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
};

Generator.prototype.askForModules = function askForModules(){
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: true
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: true
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }, {
      value: 'routeModule',
      name: 'angular-route.js',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props){
    var hasMod = function (mod){ return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.routeModule = hasMod('routeModule');

    var angMods = [];

    if(this.cookiesModule){
      angMods.push("'ngCookies'");
    }
    if(this.resourceModule){
      angMods.push("'ngResource'");
    }
    if(this.sanitizeModule){
      angMods.push("'ngSanitize'");
    }
    if(this.routeModule){
      angMods.push("'ngRoute'");
      this.env.options.ngRoute = true;
    }
    if(angMods.length){
      this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
    }

    cb();
  }.bind(this));
};

// Generator.prototype.askForHeroku = function askForHeroku(){
//   var cb = this.async();

//   this.prompt([{
//     type: 'confirm',
//     name: 'heroku',
//     message: 'Are you using heroku to serve?',
//     default: true
//   }], function (props){
//     this.heroku = props.heroku;

//     cb();
//   }.bind(this));
// };

Generator.prototype.readIndex = function readIndex(){
  this.ngRoute = this.env.options.ngRoute;
  this.indexFile = this.engine(this.read('app/index.html'), this);
};

Generator.prototype.bootstrapFiles = function bootstrapFiles(){
  this.copy('app/styles/main.' + (this.compass ? 's' : '') + 'css');

  this.copy('app/styles/_typography.scss');
  this.copy('app/styles/_extras.scss');
  this.copy('app/styles/_media-queries.scss');
  this.copy('app/styles/_variables.scss');
};

Generator.prototype.appJs = function appJs(){
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', 'app']
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml(){
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles(){
  this.coffee = this.env.options.coffee;
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_package.json', 'package.json');
  this.template('root/_Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.imageFiles = function (){
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('images', 'app/images', true);
};

Generator.prototype.icoFiles = function (){
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('ico', 'app/ico', true);
};

Generator.prototype._injectDependencies = function _injectDependencies(){
  if(!this.options['skip-install']){
    wiredep({
      directory: 'app/bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: 'app/',
      src: 'app/index.html',
      fileTypes: {
        html: {
          replace: {
            css: '<link rel="stylesheet" href="{{filePath}}">'
          }
        }
      }
    });
  }
};

Generator.prototype.goodbye = function goodbye(){
  this.logger.log(art.hfsEndArt, {logPrefix: ''});
  this.log(
    '' +
    '\nNow run...' +
    '\nnpm install' +
    '\nbower install' +
    '\ngrunt bowerInstall' +
    '\nadd password to .ftppass for ftp server' +
    '\ncmd.exe is your quick way in' +
    '' +
    ''
  );
};
