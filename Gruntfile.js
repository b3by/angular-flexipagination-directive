module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    karma: {
      unit: {
        configFile: './tests/karma.conf.js',
        options: {
          files: ['./unit/*.js']
        }
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: "tests/protractor.conf.js"
      },
      singleRun: { },
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },

    connect: {
      options: {
        port: 8888,
        hostname: 'localhost'
      },
      test: {
        options: {
          base: ['./']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      protractor: {
        files: ['src/directives/*', 'tests/e2e/*.js'],
        tasks: ['protractor:singleRun']
      }
    },

    clean: ["./node_modules", "bower_components"]

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint', 'connect:test', 'protractor:singleRun']);
  grunt.registerTask('testDev', ['jshint', 'connect:test', 'protractor:singleRun', 'watch:protractor']);

}
