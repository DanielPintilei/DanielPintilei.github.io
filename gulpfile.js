var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var stylus       = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src('styl/**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('styl/**/*.styl', ['css']);
  browserSync.init({
    server: {
      baseDir: './'
    },
    tunnel: false,
    notify: false
  });
});
