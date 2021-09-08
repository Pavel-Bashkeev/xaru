let preprocessor = 'scss';

const {
       src,
       dest,
       parallel,
       series,
       watch
} = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const scss = require('gulp-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
// const webpConv = require('gulp-webp');
const newer = require('gulp-newer');
const del = require('del');
const sprite = require('gulp-svg-sprite');

function styles() {
       return src([
                     'app/' + preprocessor + '/main.' + preprocessor + '',
              ])
              .pipe(eval(preprocessor)())
              .pipe(concat('style.min.css'))
              .pipe(autoprefixer({
                     overrideBrowserslist: ['last 10 versions'],
                     grid: true,
              }))
              .pipe(cleanCss(({
                     level: {
                            1: {
                                   specialComments: 0
                            }
                     }
              })))
              .pipe(dest('app/css/'))
              .pipe(browserSync.stream())
}

function scripts() {
       return src([
                     './node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
                     './app/js/vendor/**/*.js',
              ])
              .pipe(babel({
                     presets: ['@babel/env'],
              }))
              .pipe(concat('main.min.js'))
              .pipe(uglify())
              .pipe(dest('app/js/'))
              .pipe(browserSync.stream())
}

function images() {
       return src('./app/images/src/**/*.+(png|jpg|jpeg)')
              .pipe(newer('app/images/dest/'))
              .pipe(imagemin([
                     imagemin.mozjpeg({
                            quality: 95,
                            progressive: true
                     }),
                     imagemin.optipng({
                            optimizationLevel: 2
                     }),
              ]))
              // .pipe(webpConv())
              .pipe(dest('app/images/dest/'))
}

function imagesSvgSprite() {
       return src('./app/images/dest/icons/**/*.svg')
              .pipe(sprite({
                     mode: {
                            stack: {
                                   sprite: '../sprite.svg'
                            }
                     }
              }))
              .pipe(dest('./app/images/dest/'));
}
// Работа со шрифтами
function fonts() {
       src('./fontsSrc/**.ttf')
              .pipe(dest('./app/fonts/'))
              .pipe(ttf2woff())
              .pipe(dest('./app/fonts/'))
       return src('./fontsSrc/**.ttf')
              .pipe(ttf2woff2())
              .pipe(dest('./app/fonts/'))
}
// Работа со шрифтами
function browsersync() {
       browserSync.init({
              server: {
                     baseDir: 'app/'
              },
              notify: false,
              //  notify: false убирает уведомление 
              online: true
       });
}

function cleanimg() {
       return del('app/images/dest/**/*', {
              force: true
       })
}

function cleandist() {
       return del('dist/**/*', {
              force: true
       })
}

function buildcopy() {
       return src([
                     'app/css/**/*.min.css',
                     'app/js/*.min.js',
                     'app/data/**/*',
                     'app/images/dest/**/*',
                     'app/fonts/**/*',
                     'app/**/*.html',
              ], {
                     base: 'app'
              })
              .pipe(dest('dist'));
}

function startwatch() {
       watch('app/**/' + preprocessor + '/**/*', styles);
       watch(['app/**/*js', '!app/**/*.min.js'], scripts);
       watch('app/**/*.html').on('change', browserSync.reload);
       watch('app/images/src/**/*', images);
       watch('./app/images/dest/icons/**/*', imagesSvgSprite);
}

exports.styles = styles;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.imagesSvgSprite = imagesSvgSprite;
exports.fonts = fonts;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;

exports.build = series(cleandist, styles, scripts, images, buildcopy);

exports.default = parallel(imagesSvgSprite, styles, scripts, browsersync, startwatch);