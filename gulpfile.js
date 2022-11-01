const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const postcss = require("gulp-postcss");
const plumber = require("gulp-plumber");
let config = {
  localhost: "localhost:8888/", //type in address of localhost with correct port from XAMPP / etc...
  mainSCSS: "./style.scss",
  mainCSS: "./style.css",
  components: {
    scss: "./assets/scss/*.scss",
    js: "./assets/js/*.js",
    php: {
      mainTemplate: "./*.php",
      templateParts: "./templates/*.php",
    },
  },
  build: {
    css: "./assets/css/",
  },
};
const sassCompile = (done) => {
  gulp
    .src(config.components.scss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.build.css))
    .pipe(browserSync.stream());
  gulp
    .src("./style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(postcss(autoprefixer))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
  done();
};
exports.sassCompile = sassCompile;
const browserReload = (done) => {
  browserSync.reload();
  done();
};
const run = (done) => {
  browserSync.init({
    proxy: config.localhost,
    injectChanges: true,
    files: [config.build.css, config.mainCSS],
  });
  done();
};
const watchChanges = (done) => {
  //watch SCSS files and compile onchange
  gulp.watch(config.components.scss, sassCompile);
  gulp.watch(config.mainSCSS, sassCompile);
  //watch JS files and reload on change
  gulp.watch(config.components.js, browserReload);
  //watch changes to PHP files - on change - reload page
  gulp.watch(config.components.php.mainTemplate, browserReload);
  gulp.watch(config.components.php.templateParts, browserReload);
  done();
};
const executeGulp = gulp.parallel(run, watchChanges);
exports.default = executeGulp;
