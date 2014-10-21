'use strict';

var includePathSearcher = require('include-path-searcher');
var assign = require('object-assign');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var CachingWriter = require('broccoli-caching-writer');
var Rework = require('rework');

function ReworkCompiler(inputTrees, inputFile, outputFile, opts) {
  if (!(this instanceof ReworkCompiler)) {
    return new ReworkCompiler(inputTrees, inputFile, outputFile, opts);
  }

  CachingWriter.apply(this, [inputTrees, opts]);

  this.inputFile = inputFile;
  this.outputFile = outputFile;
  this.opts = opts || {};
}

ReworkCompiler.prototype = Object.create(CachingWriter.prototype);
ReworkCompiler.prototype.constructor = ReworkCompiler;

ReworkCompiler.prototype.updateCache = function(srcPaths, destDir) {
  var destFile = destDir + '/' + this.outputFile;

  mkdirp.sync(path.dirname(destFile));

  var filename = includePathSearcher.findFileSync(this.inputFile, srcPaths);
  var data = fs.readFileSync(filename, 'utf8');

  var rework = new Rework(data, {
    source: filename
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
