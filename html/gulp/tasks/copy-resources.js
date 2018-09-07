var gulp        = require('gulp');
var config      = require('../config').resources;
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');


gulp.task('copy-resources', function () {
  return gulp.src(config.src, {base: config.base})
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: config.srcRoot}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream({stream: true}));
});