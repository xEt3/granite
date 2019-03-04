'use strict';

module.exports = function (environment) {
  let ENV = Object.assign({}, environment);

  ENV['revision-data'] = { type: 'file-hash' };
  ENV.rollbar = {
    accessToken:       ENV.emberRollbarClient.accessToken,
    serverAccessToken: process.env.ROLLBAR_SERVER_TOKEN,
    minifiedPrependUrl (context) {
      return 'https://www.granitehr.com/' + context.revisionData.revisionKey + '/';
    }
  };

  console.log('Deploy environment is', ENV);

  return ENV;
};
