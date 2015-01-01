var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var pre = 'client';

var paths = {
  styl: [pre+'/**/*.styl'],
  js: [pre+'/app/**/*.js'],
  html: [pre+'/index.html', pre+'/app/**/*.html'],
  css: [],
  images: [pre+'/images']
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('styles', function () {
  return gulp.src(pre+'/styl/main.styl')
    .pipe($.stylus())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(pre+'/css'))
    .pipe($.size({title: 'styles'}));
});

gulp.task('html', function(){
  var assets = $.useref.assets({searchPath: '{client}'});
  return gulp.src(paths.html)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/index.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [
        /.navdrawer-container.open/,
        /.app-bar.open/
      ]
    })));

});

gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: true,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // server: {
      // baseDir: ['.tmp', 'app']
      proxy: 'localhost:8080'
    // }
  });

  gulp.watch([paths.html], reload);
  gulp.watch(paths.styl, ['styles', reload]);
  gulp.watch([paths.js], ['jshint']);
  gulp.watch([paths.images], reload);
});
