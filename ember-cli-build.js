const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
      fs = require('fs'),
      vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

const includes = [
  'intro.js/intro.js',
  'intro.js/introjs.css',
  'At.js/dist/js/jquery.atwho.js',
  'Caret.js/dist/jquery.caret.js',
  'At.js/dist/css/jquery.atwho.min.css',
  'semantic-ui-calendar/dist/calendar.css',
  'semantic-ui-calendar/dist/calendar.js'
];

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    lessOptions: {
      paths: [
        'bower_components/semantic-ui'
      ],
      plugins: [ require('less-plugin-glob') ]
    },

    SemanticUI: {
      import: {
        css: false,
        javascript: true,
        fonts: true
      }
    },

    'ember-cli-range-slider': {
      skin: 'flat'
    }
  });

  includes.forEach(include => app.import(vendorDir + include));

  return app.toTree();
};
