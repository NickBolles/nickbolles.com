/**
 * Created by Nicholas on 9/15/2015.
 */
var dest = './public';
var src  = './src';

module.exports = {
  dest: dest,
  src: src,
  bower:       {
    srcRoot: src,
    src:  [src + '/bower_components/**/*'],
    dest:    dest + '/',
    options: {}
  },
  browserSync: {
    server:          {
      // Serve up our build folder
      baseDir: dest,
      port: 3005
    },
    reloadDelay:     9999999,
    reloadDebounce:  9999999,
    reloadOnRestart: false,
    tunnel:          false,
    open:            false
  },
  sass:        {
    srcRoot:      src + '/sass',
    src:          src + '/sass/**/*.{sass,scss}',
    dest:         dest + '/css',
    settings:     {
      imagePath:       'img', // Used by the image-url helper
      errLogToConsole: true,
      sourcemap:       true,
      sourcemapPath:   src + '/sass'
    },
    autoprefixer: {
      settings: {
        browsers: ['last 2 version']
      }
    }
  },
  images:      {
    src:  [src + '/img/**'],
    dest: dest + '/img',
  },
  jshint:      {
    src: [
      src + '/js/**/*.js',
      '!' + src + '/js/libs/**'
    ]
  },
  markup:      {
    src:  [
      src + '/templates/**/*.html',
      src + '/index.html',
      src + '/modules/**/*.html'
    ],
    dest: dest,
    base: src
  },
  resources:   {
    srcRoot: src,
    src:  [src + '/js/libs/**/*', src + '/resources/**/*', src + '/cass/**/*'],
    base: src,
    dest: dest
  },
  browserify:  {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [
      {
        entries:    src + '/js/app.js',
        dest:       dest,
        outputName: 'main.js',
        // Additional file extentions to make optional
        extensions: [],
        // list of modules to make require-able externally
        require:    []
        // See https://github.com/greypants/gulp-starter/issues/87 for note about
        // why this is 'backbone/node_modules/underscore' and not 'underscore'
      }
    ]
  }
};