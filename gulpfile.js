/*====================================================================================================================
 * gulpfile
 *====================================================================================================================*/

var del = require("del");
var gulp = require("gulp");

/*--------------------------------------------------------------------------------------------------------------------
 * お掃除タスク
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("clean", del.bind(null, "dist"));

/*--------------------------------------------------------------------------------------------------------------------
 * ビルドタスク
 *--------------------------------------------------------------------------------------------------------------------*/

gulp.task("build", []);
