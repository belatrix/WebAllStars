'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
 
gulp.task('server', function() {
  gulp.src('source/**')
    .pipe(server({
      livereload: true,
      directoryListing: false	,
      open: true,
      port: 3000
    }));
});