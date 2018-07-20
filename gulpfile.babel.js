'use strict';

import gulp             from 'gulp';
import browserSync      from 'browser-sync';
import uglify           from 'gulp-uglify';
import watch            from 'gulp-watch';
import sass             from 'gulp-sass';
import concat           from 'gulp-concat';
import panini           from 'panini';
import rename           from 'gulp-rename';
import browserify       from 'browserify';
import source           from 'vinyl-source-stream';
import buffer           from 'vinyl-buffer';
import babelify         from 'babelify';
import yargs            from 'yargs';
import gulpif           from 'gulp-if';

// WARNING: this setup is for a highly specific purpose, so modify
// this file as needed!

// Set your project title, path to your css and js for production.
const PROJECT = 'Project Title';

const DIRS = {
    dist: 'dist',
    build: 'docs',
    views: 'src/views',
    styles: 'src/sass',
    scripts: 'src/js'
}

const SOURCES = {
    scss: `${DIRS.styles}/**/app.scss`,
    js: `${DIRS.scripts}/app.js`
}

const PATHS = {
    root: `${DIRS.views}/pages/`,
    layouts: `${DIRS.views}/layouts/`,
    partials: `${DIRS.views}/partials/`,
    helpers: `${DIRS.views}/helpers/`,
    data: `${DIRS.views}/data/`,
} 

const ENV = {
    stage: 'staging',
    prod: 'production'
}

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Use below for production
let ENVIRONMENT = ((PRODUCTION) ? ENV.prod : ENV.stage);

// sass
gulp.task('sass', () => {
  return gulp.src(SOURCES.scss)
    .pipe(gulpif(PRODUCTION,
        sass({outputStyle: 'compressed'}).on('error', sass.logError),
        sass().on('error', sass.logError)))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(DIRS.build))
    .pipe(gulp.dest(DIRS.dist))
    .pipe(browserSync.reload({
            stream: true
    }));
});

// Browserify
gulp.task('es-js', () => {
    return browserify(SOURCES.js)
        .transform('babelify', {
            presets: [
                [
                  "env",
                  {
                    "targets": {
                      "uglify": true,
                      "browsers": ["ie >= 11"]
                    }
                  }
                ]
              ]
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulp.dest(DIRS.build))
        .pipe(gulp.dest(DIRS.dist))
        .pipe(browserSync.reload({
            stream: true
        }))
});

function pages() {
  return gulp.src(PATHS.root + '**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: PATHS.root,
      layouts: PATHS.layouts,
      partials: PATHS.partials,
      helpers: PATHS.helpers,
      data: PATHS.data
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(DIRS.build))
    .pipe(gulp.dest(DIRS.dist));
}

gulp.task('buildpages', pages);

// Reset Panini's cache of layouts and partials
gulp.task('reset', function() {
    panini.refresh()
    return pages()
})

// Run everything if you're just looking to compile
gulp.task('default', ['sass', 'es-js','buildpages']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: "docs"
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'es-js', 'buildpages'], function() {
    gulp.watch(`${DIRS.styles}/**/*.scss`, ['sass', browserSync.reload]);
    gulp.watch(`${DIRS.scripts}/**/*.js`, ['es-js', browserSync.reload]);
    gulp.watch(`${DIRS.views}/**/*.{html,hbs,handlebars}`, ['reset', browserSync.reload]);
});
