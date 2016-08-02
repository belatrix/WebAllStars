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
    return gulp.src(['source/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

