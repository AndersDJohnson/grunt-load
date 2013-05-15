###global module:false,require:false###

factory = (grunt, options = {}) ->
  fs = require 'fs'
  path = require 'path'
  util = require 'util'
  colors = require 'colors'

  log = (args) ->
    grunt.verbose.writeln args

  getNpmTasks = (arg) ->
    npmTasks = []
    if grunt.util.kindOf(arg) is 'string'
      npmTasks.push arg
    else if grunt.util.kindOf(arg) is 'array'
      npmTasks = npmTasks.concat arg
    else
      log 'searching...'
      root = path.resolve('node_modules')
      files = fs.readdirSync root
      files.forEach (name) ->
        log 'checking '.yellow + ('"' + name + '"').blue + ' module...'
        pkgfile = path.join(root, name, 'package.json')
        pkg = if grunt.file.exists(pkgfile) then grunt.file.readJSON(pkgfile) else {keywords: []}
        if pkg.keywords && pkg.keywords.indexOf('gruntplugin') isnt -1
          log ('✓ grunt plugin').green
          #util.print ('loading... ').yellow
          npmTasks.push name
          #util.print ('loaded!').green
          #util.print '\n'
        else
          log ('✗ not grunt plugin').red
    return npmTasks

  loadNpmTasks = (arg) ->
    npmTasks = getNpmTasks.call(null, arg)
    npmTasks.forEach (name) ->
      grunt.loadNpmTasks(name)
    return
  
  exports = {
    getNpmTasks: getNpmTasks
    loadNpmTasks: loadNpmTasks
  }
  
  return exports

module.exports = (grunt, options) ->
  return factory(grunt, options)
