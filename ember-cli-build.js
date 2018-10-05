'use strict';

const EmberApp  = require('ember-cli/lib/broccoli/ember-app'),
      globSync  = require('glob').sync;

const nodeIncludes = [
  'semantic-ui-calendar/dist/calendar.css',
  'semantic-ui-calendar/dist/calendar.js',
  'scrollreveal/dist/scrollreveal.min.js',
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
      plugins: [ require('less-plugin-glob') ]
    },

    'ember-cli-range-slider': { skin: 'flat' },

    fingerprint: { exclude: [ 'product-screenshots/', 'documents/' ] },

    babel: {
      plugins: [
        'transform-object-rest-spread'
      ]
    }
  });

  nodeIncludes.forEach(include => app.import(`node_modules/${include}`));

  let fontFiles = globSync('node_modules/semantic-ui-less/themes/default/assets/fonts/!(brand-icons).*');

  fontFiles.map(path =>
    app.import(path, { destDir: 'assets/themes/default/assets/fonts' }));

  return app.toTree();
};
