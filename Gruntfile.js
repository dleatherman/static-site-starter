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

    jshint: {
      jshintrc: true,
      all: ['Gruntfile.js', 'js/lib/*.js', 'js/app.js']
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);
  
}