'use strict';

const EmberApp  = require('ember-cli/lib/broccoli/ember-app'),
      ENV = process.env.EMBER_ENV,
      globSync  = require('glob').sync;

const nodeIncludes = [
  'semantic-ui-calendar/dist/calendar.css',
  'semantic-ui-calendar/dist/calendar.js',
  'scrollreveal/dist/scrollreveal.min.js',
  'emojify.js/dist/css/basic/emojify.min.css',
  'emojify.js/dist/js/emojify.min.js',
  '@bower_components/intro.js/intro.js',
  '@bower_components/intro.js/introjs.css',
  '@bower_components/At.js/dist/js/jquery.atwho.js',
  '@bower_components/Caret.js/dist/jquery.caret.js',
  '@bower_components/At.js/dist/css/jquery.atwho.min.css'
];

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    lessOptions: {
      paths: [
        'node_modules/semantic-ui-less'
      ],
      plugins:   [ require('less-plugin-glob') ],
      sourceMap: false
    },

    'ember-cli-range-slider': { skin: 'flat' },

    sourcemaps:  { enabled: false },
    fingerprint: { exclude: [ 'product-screenshots/', 'documents/' ] },

    'ember-cli-babel': { includePolyfill: ENV === 'production' },

    SemanticUI: {
      import: { fonts: false },
      source: {
        css:        'node_modules/semantic-ui-less',
        javascript: 'node_modules/semantic-ui-css',
        images:     'node_modules/semantic-ui-less/themes/default/assets/images'
      }
    },

    babel: {
      plugins: [
        'transform-object-rest-spread',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
      ]
    }
  });

  nodeIncludes.forEach(include => app.import(`node_modules/${include}`));

  let fontFiles = globSync('node_modules/semantic-ui-less/themes/default/assets/fonts/!(brand-icons).*');

  fontFiles.map(path =>
    app.import(path, { destDir: 'assets/themes/default/assets/fonts' }, { overwrite: true }));

  return app.toTree();
};
