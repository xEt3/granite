import moment from 'moment';
import { Response, faker } from 'ember-cli-mirage';


const parseIncoming = req => {
  return req.requestBody ? JSON.parse('{"' + decodeURIComponent(req.requestBody).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
};

export default function() {
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

  /* BT passthroughs */
  this.passthrough('https://api.sandbox.braintreegateway.com:443/**');
  this.passthrough('https://client-analytics.sandbox.braintreegateway.com/**');

  // Simulate login actions

  this.post('/login/company-user', (n, request) => {
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

  this.put('/company-users/:id', (n, request) => {
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

  this.get('/company-users/:id', (n, request) => {
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

  this.get('/activities', (n, request) => {
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

  this.get('/company-users', (n, request) => {
    const params = parseIncoming(request);

    let list = {
      companyUser: [{
        _id: 1,
        name: {
          first: 'Bob',
          last: 'Ross'
        },
        email: 'happytree@bobross.xxx',
        permissions : [
          '5ae33f839980c183fd064029',
          '5b1554934919630e0c3ead2d'
        ]
      }, {
        _id: 2,
        name: {
          first: 'Old',
          last: 'Yeller'
        },
        email: 'gone@hotmail.net'
      }]
    };

    if ( params._id && params._id.$ne ) {
      list.companyUser = list.companyUser.filter(i => {
        return '' + i._id !== params._id.$ne;
      });
    }

    return list;
  });

  this.post('/company-users', ()  =>{
    return {
      companyUser: {
        _id: 3,
        name: {
          first: 'Jack',
          middle: null,
          last: 'Homer'},
        employee:17
      }
    };
  });

  this.get('permissions');

  this.get('/employees');

  this.post('/companies');

  this.put('/companies/:id');

  this.post('/payment-methods');

  this.get('/assets');

  this.put('/asset/:id');

  this.get('/asset-items');

  this.get('/bt/token', () => {
    return { token: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIzNmRkMjIzMDViZmE0NzQ5MGJkNWQ4MjQyYWQ1ODJmYWZlYTJkZTM3NDVjOGVhODc5NDA4ODM2NWNkNmZhMGU2fGNyZWF0ZWRfYXQ9MjAxOC0wNC0wMlQxODoyMDowNy43OTAxMTE4NzcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0' };
  });
}
