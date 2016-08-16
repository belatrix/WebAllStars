'use strict';

var batch = require('gulp-batch'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    ginject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    server = require('gulp-server-livereload'),
    runSequence = require('run-sequence'),
    html2js = require('gulp-ng-html2js'),
    watch = require('gulp-watch'),
    files = require('./gulp/gulp.config.js');
    

 gulp.task('server', ['watch', 'index'], function() {

   	gulp.src('source/').pipe(server({
       livereload: true,
       directoryListing: false,
       open: true,
       port: 3000
     }));

 });

 gulp.task('apply',['lint'],function () {});

 gulp.task('watch', function () {
     watch(
         [
            'source/app/**/*.js',
            'source/app/**/*.html'
         ],
         batch(function (events, done) {
             gulp.start('apply', done);
         })
     );
 });

 gulp.task('index', function () {
  var target = gulp.src('./templates/source/index.html'),
      sources = gulp.src([
        './source/js/lib/**/*.js',
        './source/app/**/*.js',
        './source/css/initialize.css',
        './source/css/lib/**/*.css',
        './source/css/main.css'
      ], {read: false});
  return target.pipe(ginject(sources, {ignorePath: 'source'}))
    .pipe(gulp.dest('./source'));
});

/*gulp.task('clean', function (callback) {
    del(['./build'], {
        force: true
    }, callback);
});

gulp.task('copy-build', [
    'copy-assets',
    'copy-app-js',
    'copy-vendor-js'
]);*/

//gulp.task('copy-assets', function () {
//    return gulp.src('./source/assets/**/*')
//        .pipe(gulp.dest('./build/assets'));
//});

/*gulp.task('copy-app-js', function () {
    return gulp.src(files.app_files.js)
        .pipe(gulp.dest('./build'));
});

gulp.task('jslint', function () {
  return gulp.src(files.app_files.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jshint', function () {
    return gulp.src(files.app_files.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('lint', ['jslint', 'jshint']);

gulp.task('html2js', function () {
    return gulp.src(files.app_files.atpl)
        .pipe(html2js({
            moduleName: 'templates-app'
        }))
        .pipe(concat('templates-app.js'))
        .pipe(gulp.dest('./build/app'))
        .pipe(livereload());
});*/


