###global exports:false,require:false###
grunt = require 'grunt'
gruntload = require('../lib/index')(grunt)

exports['gruntload'] =
  
  'getNpmTasks auto': (test) ->
    tasks = gruntload.getNpmTasks()
    test.deepEqual tasks, [
      'grunt-contrib-coffee',
      'grunt-contrib-jshint',
      'grunt-contrib-nodeunit',
      'grunt-contrib-watch'
    ]
    test.done()

  'getNpmTasks single': (test) ->
    tasks = gruntload.getNpmTasks('one')
    test.deepEqual tasks, ['one']
    test.done()

  'getNpmTasks list': (test) ->
    list = ['one','two','three']
    tasks = gruntload.getNpmTasks(list)
    test.deepEqual tasks, list
    test.done()
