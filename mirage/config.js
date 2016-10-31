import moment from 'moment';
import { Response } from 'ember-cli-mirage';

const parseIncoming = req => {
  return req.requestBody ? JSON.parse('{"' + decodeURIComponent(req.requestBody).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
};

export default function() {
  this.namespace = 'api/v1';
  this.logging = true;
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).
    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // Simulate login actions
  this.post('/login/company-user', ({}, request) => {
    const params = parseIncoming(request);
    console.log(params);

    if ( params.email !== 'user@test.com' ) {
      return new Response(401, {}, 'User not found.');
    } else if ( params.password === '1234' ) {
      return {
        expires: moment().add(1, 'day').toDate(),
        token: 123456789,
        user: 1,
        id: 1
      };
    } else {
      return new Response(401, {}, 'Password does not match');
    }
  });
}
