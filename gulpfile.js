var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var bless = require('gulp-bless');
var cssmin = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cache = require('gulp-cached');
var stylestats = require('gulp-stylestats');


var paths = {
  sass: 'sass/*.scss',
  sassWatch: 'Blank_widgets_bundle/**/styles/*.scss',

  scripts: 'Blank_widgets_bundle/*/js/*.js',
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('clean-styles', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build/stylesheets'], cb);
});

gulp.task('clean-scripts', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build/scripts'], cb);
});

gulp.task('scripts-release', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(concat('secondthought-addons-scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(concat('secondthought-addons-scripts.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('sass', function () {
  return sass('sass/style.scss', { sourcemap: true })
    .on('error', function (err) { console.log(err.message); })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('sass-release', function () {
  return sass('sass/style.scss', { sourcemap: true })
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(bless({ imports: true }))
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('scss-lint', function() {
  return gulp.src('sass/*.scss')
    .pipe(scsslint({
      'config': 'lint.yml',
    })
  );
});

gulp.task('lint-watch', function() {
  gulp.watch('sass/**/*.scss', ['scss-lint']);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sassWatch, ['sass']);
});

gulp.task('watch-release', function() {
  gulp.watch(paths.scripts, ['scripts-release']);
  gulp.watch(paths.sassWatch, ['sass-release']);
});

gulp.task('stylestats', function () {
  return gulp.src('build/blip-addons-styles..css')
    .pipe(stylestats());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'sass', 'watch']);

gulp.task('release', ['scripts-release', 'sass-release', 'watch-release']);

gulp.task('stats', ['sass-release', 'stylestats']);
