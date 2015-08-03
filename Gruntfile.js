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
      singleRun: {
        configFile: './tests/karma.conf.js',
        singleRun: true
      },
      dev: {
        configFile: './tests/karma.conf.js',
        singleRun: false
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

    clean: ["./node_modules", "bower_components"]

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['fullTest']);

  grunt.registerTask('unitTest', ['jshint', 'karma:singleRun']);
  grunt.registerTask('e2eTest', ['jshint', 'connect:test', 'protractor:singleRun']);
  grunt.registerTask('test', ['e2eTest']);

  grunt.registerTask('fullTest', ['unitTest', 'e2eTest']);
  grunt.registerTask('testDev', ['jshint', 'karma:dev']);

}
