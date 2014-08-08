module.exports = function(grunt) {
  grunt.initConfig({

    less: {
      production: {
        options: {
          paths: ['css'],
          cleancss: true
        },
        files: {
          'css/style.css': 'css/less/style.less'
        }
      }
    },

    kss: {
      options: {
        includeType: 'less',
        includePath: 'css/less/style.less',
        template: 'bootstrap-antlers'
      },
      dist: {
          files: {
            'styleguide': ['demo']
          }
      }
    },

    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: 'img/src',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/dist/'
        }]
      }
    },

    jshint: {
      all: {
        src: ['Gruntfile.js', 'js/src/*'],
        options: {
          bitwise: true,
          curly: true,
          eqeqeq: true,
          forin: true,
          freeze: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          nonbsp: true,
          plusplus: true,
          quotmark: 'single',
          undef: true,
          unused: true,
          strict: true,
          trailing: true,
          validthis: true,
          indent: 2,
          globals: {
            console: true,
            window: true,
            jQuery: true,
            module: true
          }
        }
      }
    },

    uglify: {
      default: {
        files: {
          'js/app.min.js': ['js/lib/modernizr.js', 'js/lib/*.js', 'js/app.js']
        },
        beautify: true
      }
    },

    watch: {
      files: ['*', 'css/less/*', 'js/app.js'],
      tasks: ['less:production', 'uglify:default'],
      options: {
        livereload: true
      },
      js: {
        files: ['js/src/*', 'js/lib/*'],
        tasks: ['jshint:all', 'uglify:dist']
      },
      less: {
        files: ['css/less/*'],
        tasks: ['less:production']
      },
      imagemin: {
        files: ['img/src/*'],
        tasks: ['newer:imagemin:all']
      },
      static: {
        files: ['index.html']
      },
      config: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          base: '.',
          keepalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['connect', 'newer:imagemin:all', 'watch']);
  
}