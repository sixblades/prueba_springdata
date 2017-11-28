(function(){
'use strict';
module.exports = function (grunt) {
  
  // Definicion de los proxies de la aplicacion para desarrollo y protractor
  var proxy = require('./proxyMiddleware');

  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      }, 
      // Comentado hasta que se corrijan todos los errores jshint
      //scripts: {
        //files: ['<%= config.app %>/**/*.js', '<%= config.app %>/**/*.*.js',],
        //tasks: ['jshint']
      //}
    },
    
    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/**/*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/img/{,*/}*',
            '<%= config.app %>/**/*.js',
            '<%= config.app %>/**/*.*.js',
            '<%= config.app %>/i18n/**/*.json'
          ],
          port: 9000,
          server: {
            baseDir: [config.app],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: proxy.serve
          }
        }
      },
      livereloadFront: {
        options: {
          files: [
            '<%= config.app %>/**/*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/img/{,*/}*',
            '<%= config.app %>/**/*.js',
            '<%= config.app %>/**/*.*.js',
            '<%= config.app %>/i18n/**/*.json'
          ],
          port: 9000,
          server: {
            baseDir: [config.app],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: proxy.protractor
          }
        }
      },
      test: {
        options: {
          port: 9000,
          open: false,
          host: 'localhost',
          server: {
            baseDir: [config.app],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: proxy.protractor
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: {
            baseDir: ['<%= config.dist %>'],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: proxy.serve
          }
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      jshintrc: ".jshintrc",
      reporter: require('jshint-stylish'),
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '<%= config.app %>/scripts/**/{,*/}*.js',
        '!<%= config.app %>/scripts/app.constants.js',
        '!<%= config.app %>/scripts/init.js',
        '!<%= config.app %>/scripts/end.js',
        '!<%= config.app %>/scripts/vendor/*',
        
        'test/spec/{,*/}*.js'
      ]
    },

    // Compiles ES6 with Babel
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts',
          src: ['{,**/}*.js','{,**/}*.*.js', '!init.js','!end.js'],
          dest: '.tmp/scripts'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,**/}*.js',
          dest: '.tmp/spec'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
          })
        ]
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

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        src: ['<%= config.app %>/index.html'],
        ignorePath: /^(\.\.\/)*\.\./
      },
      test: {
        devDependencies: true,
        src: 'test/karma.conf.js',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css',
           '<%= config.dist %>/img/{,*/}*.*',
          '<%= config.dist %>/styles/fonts/{,*/}*.*',
           '<%= config.dist %>/*.{ico,png}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/img',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html', '<%= config.dist %>/scripts/**/*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        },{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['**/*.html', '!doc'],
          dest: '<%= config.dist %>'
        }]
      }
    },
    // Copies remaining files to places other tasks can use
    copy: { 
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'InfoV&Y/*/*.*',
            'img/{,*/}*.webp',
            '{,*/}*.html',
            '!doc',
            'scripts/**/*.html',
            'i18n/*/**/*.json',
            'fonts/*.*',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'babel:dist',
        'copy:styles'
      ],
      test: [
        'babel',
        'copy:styles'
      ],
      dist: [
        'babel',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    ngconstant: {
      options: {
        name: 'mentoringApp',
        deps: false,
        wrap: '"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
      },
      dev: {
        options: {
          dest: '<%= config.app %>/scripts/app.constants.js',
        },
        constants: {
          ENV: 'dev',
          VERSION: '1.0.0-SNAPSHOT'
        }
      },
      prod: {
        options: {
          dest: '<%= config.dist %>/scripts/app.constants.js',
        },
        constants: {
          ENV: 'prod',
          VERSION: '1.0.0-SNAPSHOT'
        }
      }
    },
    
    // Autoinject angular dependencies for minify
    ngAnnotate: {
      options: { singleQuotes: true},
      app: {
        files: [{
            expand: true,
            src: ['.tmp/concat/**/*.js', '.tmp/concat/**/*.*.js']
          },
        ],
      }
    },
    
    
    // Testing configuration
    
    // Unit Tests
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },
    
    // E2E Tests
    protractor: {
      options: {
        configFile: "test/protractor.conf.js",
        noColor: false
      },
      e2e: {
        options: {
          // Stops Grunt process if a test fails
          keepAlive: true
        }
      }
    }
  });
  
  
  // GRUNT TASKS
  
  // Unit test task
  grunt.registerTask('unit-test', [
      'wiredep:test',
      'karma']);
      
  // E2E test Task
  grunt.registerTask('e2e-test', [
      'browserSync:test', 
      'protractor:e2e']);

  // Global Test task
  grunt.registerTask('test', function (target) {
    grunt.task.run([
      'build',
      'unit-test',
      'e2e-test'
    ]);
  });


  grunt.registerTask('serve', 'start the server and preview your app', function (target) {

    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'ngconstant:dev',
      'concurrent:server',
      'postcss',
      'browserSync:livereload',
      'watch'
    ]);
  });
  
  grunt.registerTask('frontend', function(target) {
      grunt.task.run([
      'clean:server',
      'wiredep',
      'ngconstant:dev',
      'concurrent:server',
      'postcss',
      'browserSync:livereloadFront',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  // Build task
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'concat',
    'ngAnnotate',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  // Default task. Tests + build
  grunt.registerTask('default', [
    //'jshint',
    'unit-test',
  ]);
};
})();