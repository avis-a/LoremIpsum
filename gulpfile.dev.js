"use strict";

var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');

var browserSync = require('browser-sync');

var plumber = require('gulp-plumber');

var fileInclude = require('gulp-file-include');

var sass = require('gulp-sass');

var svgstore = require('gulp-svgstore');

var rename = require('gulp-rename');

var autoprefixer = require('gulp-autoprefixer');

var del = require('del');

var ghPages = require('gulp-gh-pages');

var webpackStream = require('webpack-stream');

var webpackConfig = require('./webpack.config.js');

var $ = gulpLoadPlugins();
gulp.task('deploy', function () {
  return gulp.src('./dist/**/*').pipe(ghPages({
    branch: 'github-pages'
  }));
});
/* Primary tasks */

gulp.task('default', function (done) {
  gulp.series('serve')(done);
});
gulp.task('serve', function (done) {
  gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'images', 'sprite', 'fonts'), 'browsersync', 'watch')(done);
});
gulp.task('build', function (done) {
  gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'images', 'sprite', 'fonts'), 'browsersync', 'watch')(done);
});
gulp.task('html', function () {
  return gulp.src(['./source/*.html']).pipe(plumber()).pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  })).pipe(gulp.dest('./dist/')).on('end', function () {
    browserSync.reload();
  });
});
gulp.task('styles', function () {
  return gulp.src('./source/styles/main.scss').pipe(sass({
    'includePaths': 'node_modules'
  })).pipe(autoprefixer()).pipe(gulp.dest('./dist/styles/')).pipe(browserSync.stream({
    match: '**/*.css'
  }));
});
gulp.task('scripts', function () {
  return gulp.src(['./source/scripts/**/*.js']).pipe(webpackStream(webpackConfig)).pipe(gulp.dest('./dist/scripts'));
});
gulp.task('images', function () {
  return gulp.src('source/images/**/*').pipe($.imagemin()).pipe(gulp.dest('dist/images'));
});
gulp.task('fonts', function () {
  return gulp.src('source/fonts/**/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest('dist/fonts'));
});
gulp.task('sprite', function () {
  return gulp.src('source/images/sprite/*.svg').pipe(svgstore({
    inlineSvg: true
  })).pipe(rename('sprite.svg')).pipe(gulp.dest('dist/images'));
});
gulp.task('browsersync', function (done) {
  browserSync.init({
    server: ['./dist'],
    notify: false,
    ui: false,
    online: false,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
  done();
});
gulp.task('watch', function () {
  global.isWatching = true;
  gulp.watch('./source/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('./source/**/*.html', gulp.series('html'));
  gulp.watch('./source/scripts/**/*.js', gulp.series('scripts'));
});
gulp.task('clean', function () {
  return del(['./dist/**/*'], {
    dot: true
  });
});