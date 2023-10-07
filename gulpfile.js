// modules
const fs      = require('fs')
const bsync   = require('browser-sync').create()
const webpack = require('webpack-stream')

// gulp
const { src, dest, series, parallel, watch } = require('gulp')

// gulp plugins
const pug          = require('gulp-pug')
const sass         = require('gulp-sass')(require('sass'))
const data         = require('gulp-data')
const rename       = require('gulp-rename')
const replace      = require('gulp-replace')
const cleanCSS     = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')
const urlBuilder   = require('gulp-url-builder')
const autoprefixer = require('gulp-autoprefixer')
const htmlbeautify = require('gulp-html-beautify')
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

// variables
const destination = 'docs'
const webpackOptions = { mode: 'development' }
const locals = {}

// pug
function pugCompile() {
  return src([
    'src/pug/views/**/*.pug'
  ]).pipe( pug({ locals }) )
    .pipe( htmlbeautify({ indent_size: 2 }) )
    .pipe( urlBuilder() )
    .pipe( dest(destination) )
    .pipe( bsync.reload({ stream: true }) )
}

function pugWatch(cb) {
  watch(['src/pug/**/*.pug'], pugCompile)
  cb()
}

// sass
function sassCompile() {
  return src([
    'src/scss/**/*.+(sass|scss|css)',
    '!src/scss/**/_*.*'
  ])
      .pipe(plumber()) // предотвращает остановку Gulp при ошибках
      .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError)) // логирует ошибки Sass
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(dest(`${destination}/css`))
      .pipe(bsync.reload({ stream: true }));
}

function sassWatch(cb) {
  watch(['src/scss/**/*.+(sass|scss|css)'], sassCompile)
  cb();
}

// javascript
function jsBundle() {
  return src('src/js/app.js')
    .pipe( webpack(webpackOptions) )
    .pipe( rename({ basename: 'app' }) )
    .pipe( dest(`${destination}/js`) )
    .pipe( bsync.reload({ stream: true }) )
}

function jsWatch(cb) {
  watch('src/js/**/*.js', jsBundle)
  cb()
}

function imagesCompile() {
  return src('src/images/**/*.*') // выбираем все изображения из папки src/images
      .pipe(imagemin()) // оптимизируем изображения для веба
      .pipe(dest(`${destination}/images`)) // копируем их в папку docs/images
      .pipe(bsync.reload({ stream: true })); // перезагружаем сервер Browsersync
}

function imagesWatch(cb) {
  watch('src/images/**/*.*', imagesCompile) // следим за изменениями всех изображений в папке src/images
  cb();
}

// browsersync
function sync() {
  bsync.init({
    server: {
      baseDir: `./${destination}`
    }
  })
}

// exports
exports.pug     = pugCompile
exports.sass    = sassCompile
exports.js      = jsBundle
exports.images  = imagesCompile; // экспортируем таск images, чтобы его можно было использовать отдельно
exports.build   = parallel(exports.pug, exports.sass, exports.js, exports.images); // добавляем таск images в build
exports.watch   = series(pugWatch, sassWatch, jsWatch, imagesWatch); // добавляем таск imagesWatch в watch
exports.default = series(exports.build, exports.watch, sync)
