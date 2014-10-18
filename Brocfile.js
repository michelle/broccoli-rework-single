'use strict';

var rework = require('./');
var imprt = require('rework-import');

module.exports = rework('test/fixtures', 'app.css', 'app.css', {
  use: function(css) {
    css.use(imprt());
  }
});
