import moment from 'moment';
import { Response, faker } from 'ember-cli-mirage';

const parseIncoming = req => {
  return req.requestBody ? JSON.parse('{"' + decodeURIComponent(req.requestBody).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
};

export default function testConfig() {
  this.logging = true;
  this.namespace = '/api/v1';
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

    if ( params.email !== 'user@test.com' ) {
      return new Response(401, {}, 'User not found.');
    } else if ( params.password === '1234' ) {
      return {
        expires: moment().add(1, 'day').toDate(),
        token: 123456789,
        user: 1,
        id: 11
      };
    } else {
      return new Response(401, {}, 'Password does not match');
    }
  });

  this.get('/company-users/:id', ({}, request) => {
    return {
      companyUser: {
        _id: request.params.id,
        name: {
          first: 'Bob',
          last: 'Ross'
        },
        email: 'happytree@bobross.xxx'
      }
    };
  });

  this.get('/activities', ({}, request) => {
    const params = parseIncoming(request),
          limit = params.limit || 10;

    let activities = [];

    for (let i = 0; i < limit; i++) {
      activities.push({
        _id: i + 21,
        descriptionHtml: faker.fake('{{name.firstName}} {{hacker.verb}} {{hacker.noun}}')
      });
    }

    return { activity: activities };
  });
}
