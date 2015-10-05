import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import del  from 'del';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import path from 'path';
import { Schema } from './src/server/data/schema';
import { introspectionQuery } from 'graphql/utilities';
import { graphql } from 'graphql';
import fs from 'fs';

import configs from './webpack.config';
const [ frontendConfig ] = configs;

let compiler;

// trigger a manual recompilation of webpack(frontendConfig);
function recompile() {
  if (!compiler)
    return null;
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err)
        reject(err);
      console.log('[webpackDevServer]: recompiled');
      resolve();
    });
  });
}

// run the webpack dev server
//  must generate the schema.json first as compiler relies on it for babel-relay-plugin
gulp.task('frontend:webpack', ['schema:generate'], () => {
  compiler = webpack(frontendConfig);
  let server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'build', 'public'),
    hot: true,
    noInfo: true,
    stats: { colors: true },
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:8080'
    }
  });
  server.listen(3000, 'localhost', (err, result) => {
    if (err)
      return console.error(err);
    console.log('[webpackDevServer]: listening on localhost:3000');
  });
});

// Regenerate the graphql schema and recompile the frontend code that relies on schema.json
gulp.task('schema:generate', () => {
  return graphql(Schema, introspectionQuery)
    .then(result => {
      if (result.errors)
        return console.error('[schema]: ERROR --', JSON.stringify(result.errors, null, 2));
      fs.writeFileSync(
        path.join(__dirname, './src/server/data/schema.json'),
        JSON.stringify(result, null, 2)
      );
      return compiler ? recompile() : null;
    });
});

// generate the server using babel
gulp.task('server:babel', function () {
  return gulp.src("src/server/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

// recompile the schema whenever .js files in data are updated
gulp.task('schema:watch', () => {
  gulp.watch(path.join(__dirname, './src/server/data', '**/*.js'), ['schema:generate','server:babel']);
});

// copy the public directory to the build folder
gulp.task('public:copy', function () {
  return gulp
    .src('src/public/**/*.*', {base: './src'})
    .pipe(gulp.dest('build'));
})

gulp.task('public:clean', function () {
  return del([
    'build'
  ]);
});

gulp.task('server:start', ['server:babel', 'public:copy', 'schema:watch'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build', 'server.js'),
    watch: ['build/'],
    ext: 'js'
  }).on('restart', () => {
    console.log('[nodemon]: restart');
  });
});

gulp.task('frontend', ['frontend:webpack']);
gulp.task('server', ['server:start']);

gulp.task('default', ['frontend', 'server']);

