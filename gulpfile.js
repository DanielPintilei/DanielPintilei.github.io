var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var handlebars = require('gulp-compile-handlebars');
var htmlmin = require('gulp-htmlmin');
var data = require('gulp-data');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('html', function() {
  var options = {
    ignorePartials: false,
    batch: ['./hbs/partials/']
  };

  return gulp.src("hbs/*.hbs")
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return "Problem file : " + error.message;
      })
    }))
    .pipe(handlebars(data, options))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('css', function() {
  var processors = [
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    rucksack({
      responsiveType: true,
      shorthandPosition: true,
      quantityQueries: false,
      alias: false,
      inputPseudo: false,
      clearFix: false,
      fontPath: true,
      hexRGBA : true,
      easings: true
    })
  ];

  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss()).on('error', notify.onError(function(error) {
      return "Problem file : " + error.message;
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('default', function() {
  gulp.watch('hbs/**/*.hbs', ['html']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/*.js').on('change', browserSync.reload);
  browserSync.init({
    server: {
      baseDir: './'
    },
    tunnel: false,
    notify: false
  });
});

gulp.task('minhtml', function() {
  gulp.src(['./*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('mincss', function() {
  return gulp.src('css/styles.css')
    .pipe(postcss([cssnano({
      discardComments: {
        removeAll: true
      }
    })]))
    .pipe(gulp.dest('css'));
});

gulp.task('minjs', function() {
  return gulp.src('js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('minimg', function() {
  gulp.src('img/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: true
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('img'));
});

gulp.task('done', function() {
  return gulp.src('/')
    .pipe(notify("Finished generating your static site!"));
});

gulp.task('build', function(cb) {
  runSequence('minhtml', 'mincss', 'minjs', 'minimg', 'done', cb);
});
