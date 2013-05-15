/*global module:false,require:false*/
module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['index.js', 'dist/lib/**/*.js', 'dist/test/**/*.js']
      }
    },
    nodeunit: {
      files: ['dist/test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      },
      coffee: {
        files: '<%= coffee.glob_to_multiple.src %>',
        tasks: ['coffee']
      }
    },
    coffee: {
      glob_to_multiple: {
        options: {
          bare: true
        },
        expand: true,
        //flatten: true,
        cwd: 'src',
        src: ['**/*.coffee'],
        dest: 'dist',
        ext: '.js'
      }
    }
  });

  /* Use grunt-load itself to load my grunt plugins? e.g.:
   * $ grunt --grunt-load true --verbose
   */
  if (grunt.option('grunt-load') === true) {
    require('.')(grunt).loadNpmTasks();
  }
  else {
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
  }

  grunt.registerTask('test', ['compile', 'jshint', 'nodeunit']);

  grunt.registerTask('compile', ['coffee']);
  
  // Default task.
  grunt.registerTask('default', []);

};
