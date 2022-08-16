const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const ghPages = require('gulp-gh-pages');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const $ = gulpLoadPlugins();

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

/* Primary tasks */
gulp.task('default', (done) => {
    gulp.series('serve')(done)
});

gulp.task('serve', (done) => {
    gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'images', 'sprite', 'fonts'), 'browsersync', 'watch')(done)
});

gulp.task('build', (done) => {
    gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'images', 'sprite', 'fonts'), 'browsersync', 'watch')(done)
});

gulp.task('html', () => {
    return gulp.src(['./source/*.html'])
        .pipe(plumber())
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/')).on('end', () => {
            browserSync.reload();
        });
});


gulp.task('styles', () => {
    return gulp.src('./source/styles/main.scss')
        .pipe(sass({
            'includePaths': 'node_modules'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('scripts', () => {
    return gulp.src(['./source/scripts/**/*.js'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('images', () => {
  return gulp.src('source/images/**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('source/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sprite', () => {
  return gulp.src('source/images/sprite/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('dist/images'));
});

gulp.task('browsersync', (done) => {
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

gulp.task('watch', () => {
    global.isWatching = true;

    gulp.watch('./source/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('./source/**/*.html', gulp.series('html'));
    gulp.watch('./source/scripts/**/*.js', gulp.series('scripts'));
});

gulp.task('clean', () => {
    return del(['./dist/**/*'], { dot: true });
});
