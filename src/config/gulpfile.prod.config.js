'use strict';
/*
 code by Mapk Volkov
*/
const gulp=require('gulp');
const sass=require('gulp-sass');
const pug=require('gulp-pug');
const imageMin=require('gulp-smushit');
const notify=require('gulp-notify');
const plumber=require('gulp-plumber');
const rename=require('gulp-rename');
const named=require('vinyl-named');
const webpack=require('webpack-stream');
const postCss=require('gulp-postcss');
const assets=require('./assets.prod.config');
const webpackProdConfig=require('./webpack.prod.config');

function prod(){
    //gulp styles
    gulp.task('styles',()=>{
        //scss编译css
        return gulp.src(assets.base.scss.src)
            .pipe(plumber())
            .pipe(sass())
        //css优化
            .pipe(postCss(assets.base.postcss))
            .pipe(rename({suffix: assets.base.files.rename}))
            .pipe(gulp.dest(assets.base.scss.dist))
            .pipe(notify({
                message:assets.base.scss.msg.notice
            }));
    });
    //gulp pug
    gulp.task('pug',()=>{
        return gulp.src([assets.base.pug.src,assets.base.pug.utilsrc])
            .pipe(plumber())
            .pipe(pug({
                pretty:assets.base.pug.pretty
            }))
            .pipe(rename(path=>{
                const filename = path.basename.split('_')[1];
                if(!filename){
                    return path;
                }
                path.basename = filename;
                return path;
            }))
            .pipe(gulp.dest(assets.base.pug.dist))
            .pipe(notify({
                message:assets.base.pug.msg.notice
            }));
    });
    //gulp img
    gulp.task('img',()=>{
        return gulp.src(assets.base.img.src)
            .pipe(plumber())
            .pipe(imageMin())
            .pipe(gulp.dest(assets.base.img.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
    });
    //gulp webpack
    gulp.task('webpack',()=>{
        return gulp.src(assets.base.js.src)
            .pipe(plumber())
            .pipe(named())
            .pipe(webpack(webpackProdConfig))
            .pipe(rename({suffix: assets.base.files.rename}))
            .pipe(gulp.dest(assets.base.js.dist))
            .pipe(notify({
                message:assets.base.js.msg.notice
            }));
    });
    gulp.task('build',['styles','pug','img','webpack']);
}

module.exports=prod;