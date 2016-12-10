const gulp = require('gulp')
const task = gulp.task.bind(gulp)
const src = gulp.src.bind(gulp)
const watch = gulp.watch.bind(gulp)
const dest = gulp.dest.bind(gulp)
const wrap = require('gulp-wrap')
const concat = require('gulp-concat')
const sass = require('gulp-sass')

const jsLibs =
	[ './node_modules/jquery/dist/jquery.min.js'
	, './node_modules/bootstrap/dist/js/'
	, './node_modules/lodash/lodash.min.js'
	, './node_modules/angular/angular.min.js'
	, './node_modules/angular-route/angular-route.min.js'
	]

const cssLibs =
	[ './node_modules/bootstrap/dist/css/bootstrap.min.css'
	]

task('jsLibs', function () {
	return src(jsLibs)
		.pipe(concat('libs.bundle.js'))
		.pipe(dest('./public'))
})

task('cssLibs', function () {
	return src(cssLibs)
		.pipe(concat('libs.bundle.css'))
		.pipe(dest('./public'))
})

task('libs', [ 'cssLibs', 'jsLibs' ])

task('sass', function () {
	return src([ './src/styles/app.scss' ])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.bundle.css'))
		.pipe(dest('./public'))
})

task('watch:sass', [ 'sass' ], function () {
	return watch([ './src/styles/**/*.scss' ], [ 'sass' ])
})

task('html', function () {
	const wrapper = `
	<script data-template type="text/html" id="<%= file.path.split(/[\\/]/).pop() %>">
		<%= contents %>
	</script>
	`

	return src([ './src/app/**/*.html' ])
		.pipe(wrap(wrapper))
		.pipe(concat('index.html'))
		.pipe(wrap({src: './template.html'}))
		.pipe(dest('./public'))
})

task('watch:html', [ 'html' ], function () {
	return watch([ './src/app/**/*.html' ], [ 'html' ])
})

task('js', function () {
	return src([ './src/app/**/*.js' ])
		.pipe(concat('app.bundle.js'))
		.pipe(dest('./public'))
})

task('watch:js', [ 'js' ], function () {
	return watch([ './src/app/**/*.js' ], [ 'js' ])
})

task('build', [ 'libs', 'js', 'sass', 'html' ])
task('watch', [ 'libs', 'watch:js', 'watch:sass', 'watch:html' ])
