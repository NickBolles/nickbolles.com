var gulp        = require('gulp');
var config      = require('../config').markup;
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');


gulp.task('markup', function () {
  return gulp.src(config.src, {base: config.base})
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream({stream: true}));
});
