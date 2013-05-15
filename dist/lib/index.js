/*global module:false,require:false
*/

var factory;

factory = function(grunt, options) {
  var colors, exports, fs, getNpmTasks, loadNpmTasks, log, path, util;

  if (options == null) {
    options = {};
  }
  fs = require('fs');
  path = require('path');
  util = require('util');
  colors = require('colors');
  log = function(args) {
    return grunt.verbose.writeln(args);
  };
  getNpmTasks = function(arg) {
    var files, npmTasks, root;

    npmTasks = [];
    if (grunt.util.kindOf(arg) === 'string') {
      npmTasks.push(arg);
    } else if (grunt.util.kindOf(arg) === 'array') {
      npmTasks = npmTasks.concat(arg);
    } else {
      log('searching...');
      root = path.resolve('node_modules');
      files = fs.readdirSync(root);
      files.forEach(function(name) {
        var pkg, pkgfile;

        log('checking '.yellow + ('"' + name + '"').blue + ' module...');
        pkgfile = path.join(root, name, 'package.json');
        pkg = grunt.file.exists(pkgfile) ? grunt.file.readJSON(pkgfile) : {
          keywords: []
        };
        if (pkg.keywords && pkg.keywords.indexOf('gruntplugin') !== -1) {
          log('✓ grunt plugin'.green);
          return npmTasks.push(name);
        } else {
          return log('✗ not grunt plugin'.red);
        }
      });
    }
    return npmTasks;
  };
  loadNpmTasks = function(arg) {
    var npmTasks;

    npmTasks = getNpmTasks.call(null, arg);
    npmTasks.forEach(function(name) {
      return grunt.loadNpmTasks(name);
    });
  };
  exports = {
    getNpmTasks: getNpmTasks,
    loadNpmTasks: loadNpmTasks
  };
  return exports;
};

module.exports = function(grunt, options) {
  return factory(grunt, options);
};
