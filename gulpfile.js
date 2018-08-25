var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
var istanbul = require('gulp-istanbul');

gulp.task('jasmine', function () {
  return gulp.src(['dist/test-bundle.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 5501 }));
});

gulp.task('jasmine-chrome', function () {
  return gulp.src(['dist/test-bundle.js'])
    .pipe(jasmineBrowser.specRunner({ console: true }))
    .pipe(jasmineBrowser.headless({ driver: 'chrome' }))
    .pipe(istanbul.writeReports());
});

gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('test-tmp/'));
});

gulp.task('test', ['pre-test'], function () {
  // Make sure your tests files are requiring files from the
  // test-tmp/ directory
  return gulp.src(['test/*.js']);
  // .pipe(testFramework())
  // Creating the reports after tests ran
  // .pipe(istanbul.writeReports());
});
