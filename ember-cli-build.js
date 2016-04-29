const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    lessOptions: {
      paths: [
        'bower_components/semantic-ui'
      ]
    },

    SemanticUI: {
      css: false,
      javascript: true,
      fonts: true
    }
  });

  return app.toTree();
};
