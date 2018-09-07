var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', [/*'karma'*/], function (cb) {
  // This runs only if the karma tests pass
  runSequence(
    ['sass','images','markup','bower','copy-resources'],
    'browserify'
  );
});
