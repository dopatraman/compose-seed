var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('js', function() {
  return gulp.src([
      './src/app/header/**/*.js',
      './src/app/frontpage/**/*.js',
      './src/common/**/*.js',
      './src/main.js'])
    .pipe(concat('built.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src([
    './src/common/**/*.css',
    './src/app/**/*.css'
  ])
  .pipe(concat('built.css'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['js', 'css']);
gulp.task('default', [ 'build' ]);