var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('jasmine', function () {
  return gulp.src(['src/**/*.js', 'spec/**/*spec.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 5501 }));
});
