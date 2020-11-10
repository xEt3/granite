'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function (/* targetEnv */) {
  let ENV = { hinting: false };

  ENV['revision-data'] = {
    type: 'file-hash',
    scm:  false
  };

  ENV['ember-cli-mirage'] = { enabled: false };

  let packageJson = require('../package.json'),
      gitHash = (process.env.SOURCE_VERSION || '').substr(0, 7);

  ENV.rollbar = {
    accessToken:        '6f016ff3c5ef495b9c894871857aefd4',
    accessServerToken:  process.env.ROLLBAR_SERVER_TOKEN,
    revisionKey:        `${packageJson.version}+${gitHash}`,
    minifiedPrependUrl: 'https://www.granitehr.com/'
  };

  console.log('Removing deploy dist files'); /* eslint-disable-line */
  await exec('rm -rf tmp/deploy-dist/*');

  console.log('Deploy environment is', ENV); /* eslint-disable-line */

  return ENV;
};
