var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

var compact = argv.compact || false; 

gulp.task('bundle', function() {
	return gulp.src(['./app/*.js', './common_services/*.js'])
			.pipe(concat('bundle.js'))
			.pipe(gulpif(compact, uglify()))
			.pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['bundle']);