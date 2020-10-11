/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp = require('gulp');
var config = require('../config');
var reload = require('gulp-reload');

gulp.task('watch', ['watchify'], function () {
  //start browsersync after watchify is done
  gulp.start(['browserSync']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.resources.src, ['copy-resources']);
  gulp.watch([
    'gulp/**/*.js',
    'gulpfile.js'
  ], ['restart']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});

gulp.task('restart', function () {
  console.log("CONFIG CHANGED, RESTARTING TASK");
  //gulp.reset();
  reload();
});
