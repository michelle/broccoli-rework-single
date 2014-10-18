'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('broccoli-rework-single', function() {
  afterEach(function() {
    rm.sync(path.join(__dirname, 'tmp'));
    rm.sync(path.join(__dirname, '../tmp'));
  });

  it('should build CSS with imports', function() {
    var out = fs.readFileSync(path.join(__dirname, 'tmp/app.css'), 'utf8');
    var expected = fs.readFileSync(path.join(__dirname, 'fixtures/expected/app.css'), 'utf8');
    assert.strictEqual(expected.trim(), out.trim());
  });
});
