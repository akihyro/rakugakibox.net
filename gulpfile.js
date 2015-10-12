/*====================================================================================================================
 * gulpfile
 *====================================================================================================================*/

var browserify = require("browserify");
var del = require("del");
var gulp = require("gulp");
var awspublish = require('gulp-awspublish');
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var sass = require("gulp-ruby-sass");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

/*--------------------------------------------------------------------------------------------------------------------
 * お掃除タスク
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("clean", del.bind(null, ["dist", ".sass-cache"]));

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build", [
    "build:fonts",
    "build:images",
    "build:styles",
    "build:scripts",
]);

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク: フォント
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build:fonts", function() {
    return gulp.src([
        "node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*",
        "node_modules/font-awesome/fonts/**/*",
    ])
        .pipe(gulp.dest("dist/fonts"));
});

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク: 画像
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build:images", function() {
    return gulp.src([
        "src/images/**/*",
        "!src/images/**/*.sai",
    ])
        .pipe(gulp.dest("dist/images"));
});

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク: スタイルシート
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build:styles", function() {
    return sass("src/styles/rakugakibox.net.scss", {
        bundleExec: true,
        emitCompileError: true,
        lineNumbers: true,
        loadPath: [
            "node_modules/bootstrap-sass/assets/stylesheets",
            "node_modules/font-awesome/scss",
        ],
        style: "expanded",
    })
        .pipe(gulp.dest("dist/styles"))
        .pipe(rename({extname: ".min.css"}))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest("dist/styles"));
});

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク: スクリプト
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build:scripts", function() {
    return browserify("src/scripts/rakugakibox.net.js")
        .bundle()
        .pipe(source("rakugakibox.net.js"))
        .pipe(buffer())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/scripts"));
});

/*--------------------------------------------------------------------------------------------------------------------
 * デプロイタスク: 開発環境
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("deploy:dev", ["build"], function() {
    var publisher = awspublish.create({
        region: "ap-northeast-1",
        params: {
            Bucket: "resource.blog.dev.rakugakibox.net",
            StorageClass: "REDUCED_REDUNDANCY",
        },
    });
    return gulp.src("dist/**/*")
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});

/*--------------------------------------------------------------------------------------------------------------------
 * デプロイタスク: 本番環境
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("deploy:pro", ["build"], function() {
    var publisher = awspublish.create({
        region: "ap-northeast-1",
        params: {
            Bucket: "resource.blog.rakugakibox.net",
            StorageClass: "REDUCED_REDUNDANCY",
        },
    });
    return gulp.src("dist/**/*")
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});
