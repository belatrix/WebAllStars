'use strict';

var batch = require('gulp-batch'),
    eslint = require('gulp-eslint'),
	  gulp = require('gulp'),
    inject = require('gulp-inject'),
	  server = require('gulp-server-livereload'),
	  watch = require('gulp-watch');
 
gulp.task('server', ['watch', 'index'], function() {

  	gulp.src('source/**').pipe(server({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 3000
    }));

});

gulp.task('apply',['lint'],function () {});

gulp.task('watch', function () {
  watch(['source/js/**/*.*',
    'source/layout/*.html',
    'source/views/**/*.html'
    'templates/source/**/*.html'
  ], batch(function (events, done) {
    gulp.start('apply', done);
  }));
});

gulp.task('lint', function () {
  return gulp.src(['source/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('index', function () {
  var target = gulp.src('./templates/source/index.html'),
      sources = gulp.src([
        './source/js/lib/**/*.js',
        './source/js/app/**/*.js',
        './source/css/initialize.css',
        './source/css/lib/**/*.css',
        './source/css/main.css'
      ], {read: false});
 
  return target.pipe(inject(sources, {ignorePath: 'source'}))
    .pipe(gulp.dest('./source'));
});