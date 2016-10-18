const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
      fs = require('fs'),
      vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

const includes = [
  'intro.js/intro.js',
  'intro.js/introjs.css'
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
      css: false,
      javascript: true,
      fonts: true
    },

    'ember-cli-range-slider': {
      skin: 'flat'
    }
  });

  includes.forEach(include => app.import(vendorDir + include));

  app.import('vendor/semantic-ui-calendar/calendar.css');
  app.import('vendor/semantic-ui-calendar/calendar.js');

  return app.toTree();
};
