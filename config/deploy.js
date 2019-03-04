'use strict';

module.exports = function (/* targetEnv */) {
  let ENV = {};

  ENV['revision-data'] = {
    type: 'version-commit',
    scm:  false
  };
  ENV.rollbar = {
    accessToken:       '6f016ff3c5ef495b9c894871857aefd4',
    accessServerToken: process.env.ROLLBAR_SERVER_TOKEN,
    minifiedPrependUrl (context) {
      return 'https://www.granitehr.com/' + context.revisionData.revisionKey + '/';
    }
  };

  console.log('Deploy environment is', ENV); /* eslint-disable-line */

  return ENV;
};
