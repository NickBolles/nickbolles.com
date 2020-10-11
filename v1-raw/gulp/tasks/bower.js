var gulp           = require('gulp');
var config         = require('../config').bower;
var sourcemaps     = require('gulp-sourcemaps');

//todo this is temperary, because html imports are not supported by browserify
gulp.task("bower", function () {
  //Todo filter between js, css, fonts, and minify etc.
  // http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js return
  // gulp.src(mainBowerFiles(config.options)) .on('error', handleErrors) .pipe(gulp.dest(config.dest))

  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(config.src, {base: config.srcRoot})
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: config.srcRoot}))
    .pipe(gulp.dest(config.dest));
});
