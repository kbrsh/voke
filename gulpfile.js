'use strict';

var gulp = require('gulp');
var concat = require("gulp-concat");
var header = require("gulp-header");
var size = require("gulp-size");
var uglify = require("gulp-uglifyjs");
var pkg = require('./package.json');
var comment = '\/*\r\n* Voke ' + pkg.version + '\r\n* Copyright 2017, Kabir Shah\r\n* https:\/\/github.com\/KingPixil\/voke\/\r\n* Free to use under the MIT license.\r\n* https:\/\/kingpixil.github.io\/license\r\n*\/\r\n';

// Build Voke
gulp.task('build', function () {
  return gulp.src(['./src/voke.js'])
    .pipe(concat('voke.js'))
    .pipe(header(comment))
    .pipe(size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/voke.js'])
    .pipe(uglify())
    .pipe(header(comment))
    .pipe(size())
    .pipe(concat('voke.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Run Tests
gulp.task('test', function () {

});


// Default task
gulp.task('default', ['build', 'minify']);
