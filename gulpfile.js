'use strict';

var batch = require('gulp-batch'),
	eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	server = require('gulp-server-livereload'),
	watch = require('gulp-watch');
 
gulp.task('server', ['watch'], function() {

  	gulp.src('source/**').pipe(server({
      livereload: true,
      directoryListing: false	,
      open: true,
      port: 3000
    }));

});

gulp.task('apply',['lint'],function () {});

gulp.task('watch', function () {
  watch('source/**/*.*', batch(function (events, done) {
    gulp.start('apply', done);
  }));
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['source/**/*.js'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

