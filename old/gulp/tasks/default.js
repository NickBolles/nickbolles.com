var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', [
  'clean',
  'jshint'
], function () {
  // This runs only after clean is done
  runSequence([
    'sass',
    'images',
    'markup',
    'bower',
    'copy-resources',
    'watch'
  ]);
});
