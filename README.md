# grunt-load

[![NPM version](https://badge.fury.io/js/grunt-load.png)](http://badge.fury.io/js/grunt-load)
[![NPM dependencies](https://david-dm.org/AndersDJohnson/grunt-load.png)](https://david-dm.org/AndersDJohnson/grunt-load)

> Load utilities for grunt.


## Getting Started

```sh
npm install --save-dev grunt-load
```

In your Gruntfile, require the module, passing it grunt:

```js
var gruntload = require('grunt-load')(grunt);
```

To automatically load all grunt plugins you've installed via npm:

```js
gruntload.loadNpmTasks();
```

To load at once multiple grunt plugins you've installed via npm:

```js
gruntload.loadNpmTasks(['grunt-contrib-watch', 'grunt-contrib-jshint'])
```

Also supports the grunt native style of loading a single plugin from npm:

```js
gruntload.loadNpmTasks('grunt-contrib-watch')
```
