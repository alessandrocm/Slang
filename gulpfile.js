var gulp = require('gulp');
var istanbul = require('gulp-istanbul'),
	mocha = require('gulp-mocha'),
    eslint = require('gulp-eslint');

gulp.task('test', function (cb) {
	gulp.src(['lib/**/*.js','plugins/*.js', 'main.js'])
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
 
gulp.task('lint', function () {
    return gulp.src(['lib/**/*.js','plugins/*.js','app.js','server.js'])
        // eslint() attaches the lint output to the eslint property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failOnError last. 
        .pipe(eslint.failOnError());
});
 
gulp.task('default', ['test','lint'], function () {
    // This will only run if the lint task is successful... 
});