"use strict";

// charge le module gulp dans une variable gulp
var gulp = require('gulp');
// charge le module gulp-sass dans une variable sass
var sass = require('gulp-sass');
// charge le module cssnano (minify) dns une variable cssnano
var cssnano = require('gulp-cssnano');

var moduleImporter = require('sass-module-importer');

var rename = require('gulp-rename');

// on déclare une tache sass, qui appelle une fonction anonyme
gulp.task('sass', function () {
    // récupère tous les fichiers depuis le dossier sass/**/
    return gulp.src('./src/sass/*.scss')
    // méthode pipe créée parv gulp: si il y a une erreur de compliation, ça affiche une erreur dans la ligne de commandes
        .pipe(sass().on('error', sass.logError))
        // envoie notre sass complié en css dans le dossier /css
        .pipe(gulp.dest('./dist/css'))
        // récupère les partiels sass en css
        .pipe(sass({ importer: moduleImporter() }))
        .pipe(gulp.dest('./dist/css'))
        // .pipe(gulp.dest('./css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});
//js
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
    pump([
            gulp.src('./src/js/*.js'),
            uglify(),
            gulp.dest('./dist/js')
        ],
        cb
    );
});

// dès qu'on écrit gulp dans la ligne de commande, il exécute la fonction sass et cssnano
gulp.task('default', function(){
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/js/*.js' , ['compress']);
});
/**
 * Created by Julien on 04/04/2017.
 */
