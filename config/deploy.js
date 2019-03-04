'use strict';

module.exports = function (/* targetEnv */) {
  let ENV = {};

  ENV['revision-data'] = {
    type: 'file-hash',
    scm:  false
  };

  let packageJson = require('../package.json'),
      gitHash = (process.env.SOURCE_VERSION || '').substr(0, 7);

  ENV.rollbar = {
    accessToken:        '6f016ff3c5ef495b9c894871857aefd4',
    accessServerToken:  process.env.ROLLBAR_SERVER_TOKEN,
    revisionKey:        `${packageJson.version}+${gitHash}`,
    minifiedPrependUrl: 'https://www.granitehr.com/'
  };

  console.log('Deploy environment is', ENV); /* eslint-disable-line */

  return ENV;
};
