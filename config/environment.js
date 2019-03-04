/* eslint-env node */
'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix:             'granite',
    environment,
    rootURL:                  '/',
    locationType:             'router-scroll',
    historySupportMiddleware: true,
    EmberENV:                 {
      FEATURES:          {},
      EXTEND_PROTOTYPES: { Date: false }
    },

    APP:    {},
    moment: { includeTimezone: 'all' },

    emberRollbarClient: {
      enabled:     environment === 'production',
      accessToken: '6f016ff3c5ef495b9c894871857aefd4'
    },

    SemanticUI: {
      import: {
        css:        false,
        javascript: true,
        fonts:      false
      }
    },

    'ember-cli-notifications': {
      iconClasses: {
        close:   'close icon',
        info:    'info circle icon',
        success: 'check icon',
        warning: 'warning icon',
        error:   'exclamation circle icon'
      }
    }
  };

  if (environment === 'development') {
    // ENV.BUG_THE_HELL_OUTTA_ME = true;
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV['ember-cli-mirage'] = {
      enabled:   true,
      autostart: true
    };
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    // Heroku Git Hash support
    if (process.env.SOURCE_VERSION) {
      let packageJson = require('../package.json');
      let gitHash = process.env.SOURCE_VERSION.substr(0, 7);
      ENV.emberRollbarClient.payload.client.javascript.code_version = `${packageJson.version}+${gitHash}`;
    }
  }

  return ENV;
};
