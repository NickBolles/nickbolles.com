var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');
var filter       = require('gulp-filter');

gulp.task('sass', function () {
  return gulp.src(config.src, {base: config.srcRoot})
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings).on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: config.sourcemapPath}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(config.autoprefixer.settings))
    .pipe(sourcemaps.write('./', {includeContent: false}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
