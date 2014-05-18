// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt){
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    yeoman: {
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      url: 'host1.url',
      pagespeedApi: 'AIzaSyCNJbl-I8UG63RC9Z2_zvDlPlHi2M5RQ68'
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },<% if(coffee){ %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },<% } else { %>
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },<% } %><% if(compass){ %>
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',<% if(coffee){ %>
          '.tmp/scripts/{,*/}*.js',<% } %>
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : '<%%= yeoman.dist %>'
        },
        options: {
          watchTask: true,
          ghostMode: {
            clicks: true,
            scroll: true,
            links: true,
            forms: true
          },
          host : 'localhost',
          server: {
            baseDir: '<%%= yeoman.dist %>'
          }
        }
      }
    },
    // server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // basic error checking
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'<% if(!coffee){ %>,
          '<%%= yeoman.app %>/scripts/{,*/}*.js'<% } %>
        ]
      }<% if(!coffee){ %>,
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }<% } %>
    },

    // cleans folders
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/{,*/}*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // vendor prefixes
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // inject Bower components
    bowerInstall: {
      app: {
        src: ['<%%= yeoman.app %>/index.html'],
        ignorePath: new RegExp('^<%%= yeoman.app %>/')
      }<% if(compass){ %>,
      sass: {
        src: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%%= yeoman.app %>/bower_components/'
      }<% } %>
    },<% if(coffee){ %>

    // CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %><% if(compass){ %>

    // Sass to CSS and generate necessary files
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>

    // browser caching renaming
    filerev: {
      dist: {
        src: [
          '<%%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%%= yeoman.dist %>/styles/{,*/}*.css',
          '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>','<%%= yeoman.dist %>/images']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },

    htmlhint: {
      dist: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['<%= yeoman.dist %>**/*.html']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    // remaining files copied
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/images',
          src: ['generated/*']
        }<% if(bootstrap){ %>, {
          expand: true,
          cwd: '<%%= yeoman.app %><%
            if(!compassBootstrap){
              %>/bower_components/bootstrap/dist<%
            } %>',
          src: '<% if(compassBootstrap){
              %>bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap<%
            } else { %>fonts<% }
            %>/*',
          dest: '<%%= yeoman.dist %>'
        }<% } %>]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // tasks to run in parallel
    concurrent: {
      server: [<% if(coffee){ %>
        'coffee:dist',<% } %><% if(compass){ %>
        'compass:server'<% } else { %>
        'copy:styles'<% } %>
      ],
      test: [<% if(coffee){ %>
        'coffee',<% } %><% if(compass){ %>
        'compass'<% } else { %>
        'copy:styles'<% } %>
      ],
      dist: [<% if(coffee){ %>
        'coffee',<% } %><% if(compass){ %>
        'compass:dist',<% } else { %>
        'copy:styles',<% } %>
        'imagemin',
        'svgmin'
      ]
    },

    pagespeed: {
      desktop: {
        options: {
          url: "<%= yeoman.url %>public_html/<%= pkg.name %>",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      mobile: {
        options: {
          url: "<%= yeoman.url %>public_html/<%= pkg.name %>",
          locale: "en_GB",
          strategy: "mobile",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["/speed/docs/insights/v1/getting_started", "/speed/docs/about"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      options: {
        key: "<% yeoman.pagespeedApi %>",
        url: "https://developers.google.com"
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.<%= yeoman.url %>',
          port: 21,
          authKey: 'key1'
        },
        src: '<%= yeoman.dist %>',
        dest: 'public_html/<%= pkg.name %>',
        exclusions: ['<%= yeoman.dist %>**/.DS_Store', '<%= yeoman.dist %>**/Thumbs.db']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    uncss: {
      dist: {
        files: [{
          src: '<%= yeoman.app %>*.html',
          dest: '<%= yeoman.app %>css/compiled.min.css'
        }]
      },
      options: {
        compress: true
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= yeoman.dist %>index.html': ['<%= yeoman.app %>index.html']
        }
      }
    }

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target){
    if(target === 'dist'){
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'browserSync',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target){
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'htmlhint',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('push', [
    'ftp-deploy',
    'pagespeed:desktop',
    'pagespeed:mobile'
  ]);

  grunt.registerTask('extra', [
    'uncss',
    'processhtml'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
