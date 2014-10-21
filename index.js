'use strict';

var assign = require('object-assign');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var CachingWriter = require('broccoli-caching-writer')
var Rework = require('rework');

function ReworkCompiler(inputTree, inputFile, outputFile, opts) {
  if (!(this instanceof ReworkCompiler)) {
    return new ReworkCompiler(inputTree, inputFile, outputFile, opts)
  }

  CachingWriter.apply(this, [inputTree, opts])

  this.inputFile = inputFile
  this.outputFile = outputFile
  this.sourceDir = inputTree
  this.opts = opts || {}
}

ReworkCompiler.prototype = Object.create(CachingWriter.prototype)
ReworkCompiler.prototype.constructor = ReworkCompiler

ReworkCompiler.prototype.updateCache = function(srcPaths, destDir) {
  var destFile = destDir + '/' + this.outputFile
  mkdirp.sync(path.dirname(destFile));
  var data = fs.readFileSync(filename, 'utf8');

  var rework = new Rework(data, {
    source: this.sourceDir
  });

  if (this.opts.use) {
    this.opts.use(rework);
  }

  fs.writeFileSync(
    destFile,
    rework.toString(this.opts),
    {encoding: 'utf8'}
  );
}

module.exports = ReworkCompiler;

// Add built-in rework plugins
delete Rework.properties;
assign(module.exports, Rework);
