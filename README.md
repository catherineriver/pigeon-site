# Pug Boilerplate

A boilerplate setup for projects using [Gulp](https://gulpjs.com/) to compile [Pug](https://pugjs.org/) into HTML and [Sass](https://sass-lang.com/) into CSS, while also optimizing images and managing JavaScript files with Webpack.

## Getting Started

Note: This is a template repository. New projects using this repo as a template should be created using the "Use this template" button above the file list on GitHub.

### Dependencies
* Node & npm
* Gulp 4

### Installation
1. If you haven't already, [use nvm to install node and npm](https://www.codementor.io/mercurial/how-to-install-node-js-on-macos-sierra-mphz41ekk)
2. If you haven't already, globally install the gulp command line tools: `npm install --global gulp-cli`
3. Clone this repo or use it as a template
4. In the project folder, install the node package dependencies: `npm install`

### Development
Run the default Gulp task (`gulp` or `gulp default`) in the project root to compile all files, watch for future changes, and start up [Browsersync](https://browsersync.io/).

## Gulp Tasks Overview

### 1. Pug Compilation (`pugCompile`)
- Compiles `.pug` files from `src/pug/views/` into `.html`
- Beautifies HTML output
- Handles URL building
- Outputs to `docs/` directory
- Triggers Browsersync reload on changes

### 2. Sass Compilation (`sassCompile`)
- Compiles `.sass`, `.scss`, and `.css` files from `src/scss/`, excluding partials (files starting with `_`)
- Applies autoprefixer for cross-browser compatibility
- Minifies CSS
- Outputs to `docs/css/` directory
- Triggers Browsersync reload on changes

### 3. JavaScript Bundling (`jsBundle`)
- Bundles JavaScript files using Webpack (configured in `webpackOptions`)
- Outputs to `docs/js/` directory
- Triggers Browsersync reload on changes

### 4. Image Optimization (`imagesCompile`)
- Optimizes images from `src/images/` using `gulp-imagemin`
- Outputs to `docs/images/` directory
- Triggers Browsersync reload on changes

### 5. Browsersync (`sync`)
- Serves compiled files from `docs/` directory
- Automatically reloads browser on file changes

### 6. Watch Tasks
- `pugWatch`, `sassWatch`, `jsWatch`, and `imagesWatch` watch for changes in their respective file types and trigger the corresponding compile/bundle tasks

### 7. Exported Tasks
- `exports.pug`, `exports.sass`, `exports.js`, and `exports.images` allow running individual tasks from the command line using `gulp [taskName]`
- `exports.build` runs `pugCompile`, `sassCompile`, `jsBundle`, and `imagesCompile` in parallel
- `exports.watch` runs all watch tasks in series
- `exports.default` runs `exports.build`, `exports.watch`, and `sync` in series, and is the task that runs when `gulp` is used without arguments

### Usage
- Use `gulp` for development, which will compile all assets, start Browsersync, and watch files for changes
- Use `gulp build` to compile all assets without starting Browsersync or watching files
- Use `gulp [taskName]` to run individual tasks as needed (e.g., `gulp pug` or `gulp images`)
