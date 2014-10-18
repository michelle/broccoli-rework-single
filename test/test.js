'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('broccoli-rework-single', function() {
  afterEach(function() {
    rm.sync(path.join(__dirname, '../dist'));
    rm.sync(path.join(__dirname, '../tmp'));
  });

  it('should build CSS with imports', function() {
    var out = fs.readFileSync(path.join(__dirname, '../dist/built.css'), 'utf8');
    var expected = fs.readFileSync(path.join(__dirname, 'fixtures/built.out.css'), 'utf8');
    assert.strictEqual(expected.trim(), out.trim());
  });
});
