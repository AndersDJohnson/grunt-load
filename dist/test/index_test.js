/*global exports:false,require:false
*/

var grunt, gruntload;

grunt = require('grunt');

gruntload = require('../lib/index')(grunt);

exports['gruntload'] = {
  'getNpmTasks auto': function(test) {
    var tasks;

    tasks = gruntload.getNpmTasks();
    test.deepEqual(tasks, ['grunt-contrib-coffee', 'grunt-contrib-jshint', 'grunt-contrib-nodeunit', 'grunt-contrib-watch']);
    return test.done();
  },
  'getNpmTasks single': function(test) {
    var tasks;

    tasks = gruntload.getNpmTasks('one');
    test.deepEqual(tasks, ['one']);
    return test.done();
  },
  'getNpmTasks list': function(test) {
    var list, tasks;

    list = ['one', 'two', 'three'];
    tasks = gruntload.getNpmTasks(list);
    test.deepEqual(tasks, list);
    return test.done();
  }
};
