var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');


//Compile saas into CSS and auto-inject into browsers
gulp.task('saas', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', '.src/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
  });

//moving our js files into our /src/js folder.
  gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
             'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether-1.3.3/dist/js/tether.min.js'])
      .pipe(gulp.dest('src/js'))
      .pipe(browserSync.stream());
  });

  //static server + watching scss/html files.
  gulp.task('serve', ['saas'], function() {
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
  });

  //moving our js files into our /src/js folder.
  gulp.task('default', ['js', 'serve']);