const path = require("path");
const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const sass = require("gulp-sass");
const newer = require("gulp-newer");
const postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const livereload = require("gulp-livereload");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const Cache = require("gulp-file-cache");
const polyfill = "./node_modules/@babel/polyfill/browser.js";
const cache = new Cache();
const src = "./assets";
const dist = "./dist";

const paths = {
    js: src + "/js/*.js",
    scss: src + "/scss/*.scss",
    imgs: src + "/imgs/**/*"
};
const sassOpts = {
    outputStyle: "nested",
    imagePath: dist + "/imgs",
    precision: 3,
    errLogToConsole: true,
    processors: [
        require("postcss-assets")({
            loadPaths: ["imgs/"],
            basePath: path.resolve(__dirname, "resources/dist/js"),
            baseUrl: path.resolve(__dirname, "resources/dist/js")
        })
    ]
};
// image processing
gulp.task("images", function () {
    return gulp
        .src(paths.imgs)
        .pipe(newer(dist + "/imgs"))
        .pipe(imagemin())
        .pipe(gulp.dest(dist + "/imgs"));
});

gulp.task("libs", function () {
    return gulp
        .src([
            src + '/js/libs/gsap/*.js',
            src + '/js/libs/scrollmagic/*.js',
            src + '/js/libs/etc/*.js',
        ])
        .pipe(uglify())
        .pipe(concat("vendor_bundle.js"))
        .pipe(gulp.dest(dist));
});

gulp.task("js", function () {
    return gulp
        .src([paths.js])
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(dist));
});

gulp.task("sass", function () {
    return gulp
        .src(paths.scss)
        .pipe(sass(sassOpts))
        .pipe(cleanCSS())
        .pipe(cache.filter())
        .pipe(cache.cache())
        .pipe(postcss(sassOpts.processors))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dist + "/"));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(paths.js, gulp.series("js"));
    gulp.watch(paths.imgs, gulp.series("images"));
    gulp.watch(paths.scss, gulp.series("sass"));
    gulp.watch(dist + "/**").on("change", livereload.changed);
});

//기본 task 설정
gulp.task("default", gulp.parallel("libs", "js", "images", "sass", "watch"));