var gulp         = require('gulp');
var rimraf       = require('rimraf');
var config       = require('../config.js');
var handleErrors = require('../util/handleErrors');
gulp.task('clean', function (cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  rimraf(config.dest + '**/*', function (err) {
    if (err) {
      handleErrors(err)
    }
    gulp.start(['clean']);
    cb();
  });
});