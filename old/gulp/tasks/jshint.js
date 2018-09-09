/**
 * Created by Nicholas on 7/7/2015.
 */
var gulp   = require('gulp');
var config = require('../config').jshint;
var jshint = require('gulp-jshint');
var ignore = require('gulp-ignore');

//, '!' + src +'/js/libs/**/*.js', '!' + src + '**/*.spec.js'
gulp.task('jshint', function () {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-summary', {
            wordWrap:   true,
            width:      240,
            statistics: true
          }));
});
