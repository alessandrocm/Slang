var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('test', function (cb) {
	gulp.src(['lib/**/*.js', 'main.js'])
		.pipe(istanbul()) // Covering files 
		.pipe(istanbul.hookRequire()) // Force `require` to return covered files 
		.on('finish', function () {
			gulp.src(['test/*.js'])
				.pipe(mocha())
				.pipe(istanbul.writeReports()) // Creating the reports after tests runned 
				.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90% 
				.on('end', cb);
		});
});