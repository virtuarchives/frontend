const gulp = require('gulp')

gulp.task('watch', function() {
  gulp.watch('src/styles/sass/**/*.scss', ['sass'])
});