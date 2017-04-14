var gulp = require('gulp');
// plugins.pluginName = require('gulpPlugins');
var plugins = require('gulp-load-plugins'); 

gulp.task('default', function() {
	// default task
	console.log('default');
});

gulp.task('mytask', ['array', 'name'], function() {
	// body...
	gulp.src()
	.pipe(somePlugin())
	.pipe(gulp.dest('...'));
})

// concat
// 通过stream的pipe()方法把流导入到你想要的地方，比如Gulp的插件中
// gulp.src()方法正是用来获取流的
var concat = require('gulp-concat');
gulp.task('concat', ['default'], function() {
	return gulp.src('./app/scripts/commTest/*.js')
		   .pipe(concat('commTest.min.js'))
		   .pipe(gulp.dest('./build/dist/'));
});
/*plugins.concat = require('gulp-concat');
gulp.task('concatPlugin', ['default'], function() {
	return gulp.src('./app/scripts/commTest/*.js')
		   .pipe(plugins.concat('commTest.js'))
		   .pipe(gulp.dest('./build/dist/'));
});*/

// rename a file after concat
var rename = require('gulp-rename');
gulp.task('rename', ['default'], function() {
	return gulp.src('./app/scripts/commTest/*.js')
		   .pipe(concat('commTest.js'))
		   .pipe(rename('commTest.min.js'))
		   .pipe(gulp.dest('./build/dist/'));
});

// uglify a file
var uglify = require('gulp-uglify');
gulp.task('uglify', ['default'], function() {
	gulp.src('./app/scripts/commTest/*.js')
		   .pipe(concat('commTest.js'))
		   .pipe(uglify())
		   .pipe(rename('commTest.min.js'))
		   .pipe(gulp.dest('./build/dist/'));
});

// return promise ==、demo
var q = require('q'); 
gulp.task('someone', function() {
	var deffered = q.defer();
	setTimeout(function() {
		deffered.resolve();
	}, 1);
	return deffered.promise;
});

gulp.task('five', function() {
	var deffered = q.defer();
	setTimeout(function() {
		console.log('five is done');
		deffered.resolve();
	}, 5000);
	return deffered.promise;
});
gulp.task('six', function() {
	console.log('six is done');
});
gulp.task('qAync', ['five', 'six'], function() {
	console.log('qAync is done');
});   // console.log(six, five, qAync);

// aync
gulp.task('one', function() {
	setTimeout(function() {
		console.log('one is done');
	}, 5000);
});
gulp.task('two', function() {
	console.log('two is done');
});
gulp.task('aync', ['one', 'two'], function() {
	console.log('aync is done');
});   // console.log(two, aync, one);

// aync
// accept callback ==、 demo
gulp.task('jekyll', function (cb) {
	setTimeout(function() {
		// do sth...
		cb();
	}, 5000);
});

gulp.task('three', function(cb) {
	setTimeout(function() {
		console.log('three is done');
		cb();
	}, 5000);
});
gulp.task('four', ['three'], function() {
	console.log('four is done');
});
gulp.task('callAync', ['four'], function() {
	console.log('callAync is done');
});   // console.log(three, four, callAync);

// return stream
gulp.task('somename', function() {
	var stream = gulp.src('app/script/commTest/*.js')
				 .pipe(minify())
				 .pipe(gulp.dest('build/commTest'));
	return stream;
});

gulp.task('publish', function() {
	// publish with scp
    var paras = config.server_test;
    paras.watch = function(client) {
        client.on('write', function(o) {
            console.log('upload %s', o.destination);
        });
    }

    return gulp.src([config.dist + '**/*.*'])
        .pipe(scp(paras))
        .on('error', function(err) {
            console.log(err);
        });

    // publish with ftp
    // return gulp.src(config.dist + '**/*.*')
    //     .pipe(ftp(config.server_test))
    //     .pipe(gutil.noop());  
});