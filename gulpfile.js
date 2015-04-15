'use strict';

///
// include plug-ins
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    bower = require('gulp-bower'),
    sourcemaps = require('gulp-sourcemaps');

var ROOT_PATH = 'Cik.PocketMovie.WebApp/';

var config = {
    //JavaScript files that will be combined into a jquery bundle
    jquerysrc: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-validation/dist/jquery.validate.min.js',
        'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js'
    ],
    jquerybundle: ROOT_PATH + 'Scripts/jquery-bundle.min.js',

    //JavaScript files that will be combined into a Material bundle
    materialsrc: [
        'bower_components/bootstrap-material-design/dist/js/material.min.js',
        'bower_components/respond-minmax/dest/respond.min.js'
    ],
    materialbundle: ROOT_PATH + 'Scripts/material-bundle.min.js',

    //Modernizr
    modernizrsrc: ['bower_components/modernizr/modernizr.js'],
    modernizrbundle: ROOT_PATH + 'Scripts/modernizer.min.js',

    //Material CSS and Fonts
    materialcss: 'bower_components/bootstrap-material-design/dist/css/material.css',
    materialfonts: 'bower_components/bootstrap-material-design/dist/fonts/*.*',

    appcss: ROOT_PATH + 'Content/Site.css',
    fontsout: ROOT_PATH + 'Content/dist/fonts',
    cssout: ROOT_PATH + 'Content/dist/css'
}

// Synchronously delete the output script file(s)
gulp.task('clean-vendor-scripts', function (cb) {
    del([config.jquerybundle,
              config.materialbundle,
              config.modernizrbundle], cb);
});

//Create a jquery bundled file
gulp.task('jquery-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.jquerysrc)
     .pipe(concat('jquery-bundle.min.js'))
     .pipe(gulp.dest(ROOT_PATH + 'Scripts'));
});

//Create a material bundled file
gulp.task('material-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.materialsrc)
     .pipe(sourcemaps.init())
     .pipe(concat('material-bundle.min.js'))
     .pipe(sourcemaps.write('maps'))
     .pipe(gulp.dest(ROOT_PATH + 'Scripts'));
});

//Create a modernizr bundled file
gulp.task('modernizer', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.modernizrsrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('modernizer-min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(ROOT_PATH + 'Scripts'));
});

// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('vendor-scripts', ['jquery-bundle', 'material-bundle', 'modernizer'], function () {

});

// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function (cb) {
    del([config.fontsout,
              config.cssout],cb);
});

gulp.task('css', ['clean-styles', 'bower-restore'], function () {
    return gulp.src([config.materialcss, config.appcss])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});

gulp.task('fonts', ['clean-styles', 'bower-restore'], function () {
    return
    gulp.src(config.materialfonts)
        .pipe(gulp.dest(config.fontsout));
});

// Combine and minify css files and output fonts
gulp.task('styles', ['css', 'fonts'], function () {

});

//Restore all bower packages
gulp.task('bower-restore', function() {
    return bower();
});

//Set a default tasks
gulp.task('default', ['vendor-scripts', 'styles'], function () {

});