const gulp = require("gulp");
const watch = require("gulp-watch")
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const entry = "./src/server/**/*.ts"

function tsc() {
    return tsProject.src()
        .pipe(ts.createProject("tsconfig.json")())
        .js.pipe(gulp.dest("dist"));
}
// 开发环境
function buildDev() {
    return watch(entry, {
        ignoreInitial: false
    }, gulp.series([tsc]))

}

let build = gulp.series(buildDev)

if (process.env.NODE_ENV === "production") {
    build = gulp.series(tsc)
}

gulp.task("default", build);