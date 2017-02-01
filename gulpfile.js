var gulp         = require('gulp'),
scss         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss    = require('gulp-minify-css'),
rename       = require('gulp-rename'),
browserSync  = require('browser-sync').create(),
jade         = require('gulp-jade'),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts', 'jade'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false
	});
	
});

gulp.task('styles', function () {
	return gulp.src('scss/*.scss')
	.pipe(scss({
		includePaths: require('node-bourbon').includePaths
	}).on('error', scss.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('jade/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-1.11.2.min.js',
		'./app/libs/waypoints/waypoints.min.js',
		'./app/libs/animate/animate-css.js',
		'./app/libs/plugins-scroll/plugins-scroll.js',
		])
	.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
	});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('app/fonts/font-awesome/'))
}) 

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
