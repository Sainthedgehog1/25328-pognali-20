const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const inject = require("gulp-inject");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const del = require("del");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const minify = require("gulp-minify");
const concat = require("gulp-concat");

// Server
const server = (done) => {
  sync.init({
    server: {baseDir: "build"},
    cors: true,
    open: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Reload
const reload = (done) => {
  sync.reload();
  done();
}
exports.reload = reload;

// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(css));
  gulp.watch("source/*.html", gulp.series(html, sprite, reload));
  gulp.watch("source/img/*.{png,jpg}", gulp.series(images, webp, reload));
  gulp.watch("source/js/**/*.js", gulp.series(js, reload));
}
exports.watcher = watcher;

// Clean
const clean = () => {
  return del("build/");
}
exports.clean = clean;

// Copy
const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/js/*.js",
    "source/*.png"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Js-copy
const js = () => {
  return gulp.src("source/js/*.js")
    // .pipe(uglify())
    .pipe(minify())
    .pipe(gulp.dest("build/js"));

    // .pipe(concat("all.js"))
    // .pipe(uglify())
    // .pipe(rename("script.min.js"))
    // .pipe(gulp.dest("build/js"))
}
exports.js = js;

// CSS
const css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.css = css;

// HTML
const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build/"));
}
exports.html = html;

const htmlMinify = () => {
  return gulp.src("build/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
}
exports.htmlMinify = htmlMinify;

// SVG sprite
const sprite = () => {
  let svgs = gulp.src("source/img/contacts-*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(svgmin({plugins: [{removeStyleElement: true},
       {removeAttrs: {attrs: ["fill", "class", "stroke"]}}]
    }));

  let fileContents = (filePath, file) => file.contents.toString();

  return gulp.src("build/*.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("build/"));
}
exports.sprite = sprite;

// Images min
const images = () => {
  return gulp.src("source/img/*.{png,jpg,svg}")
  .pipe(imagemin([imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({quality: 89, progressive: true}),
    imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}
exports.images = images;

// From png, jpg to webp
const webpConv = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 89}))
    .pipe(gulp.dest("build/img"));
}
exports.webp = webpConv;

const build = gulp.series(clean, copy, css, js, sprite,/* images, webpConv,*/ html, htmlMinify);
exports.build = build;
exports.default = gulp.series(
  build, server, watcher
);
