const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib',
    es: 'es',
    dist: 'dist',
    types: 'types',
  },
  styles: 'src/components/**/*.scss',
  scripts: [
    'src/components/**/*.{ts,tsx,js,jsx}',
    '!src/**/demo/*.{ts,tsx,js,jsx}',
    '!src/**/__tests__/*.{ts,tsx,js,jsx}',
  ],
};

const tsProject = ts.createProject('tsconfig.lib.json');

/**
 * 当前组件样式 import './index.scss' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.scss/g, '.css');
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.es);
}

/**
 * 生成types
 */
function createTypes() {
  return gulp.src(paths.scripts).pipe(tsProject()).pipe(gulp.dest(paths.dest.types));
}

const buildScripts = gulp.series(compileCJS, compileESM);

/**
 * 拷贝scss文件
 */
function copyScss() {
  return gulp.src(paths.styles).pipe(gulp.dest(paths.dest.lib)).pipe(gulp.dest(paths.dest.es));
}

/**
 * 生成css文件
 */
function scss2css() {
  return gulp
    .src(paths.styles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.es));
}

const build = gulp.parallel(createTypes, buildScripts, copyScss, scss2css);

exports.build = build;

exports.default = build;
