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

  this.get('/permissions', (n, request) => {
    return {
      companyUser: {
        id: 3,
        name:{
          first: 'The',
          last: 'Rock'
        },
        permissions: [
        '5ae33f839980c183fd063ffa',
        '5ae33f839980c183fd063ffc',
        '5ae33f839980c183fd063ffb',
        '5ae33f839980c183fd063ffd',
        '5ae33f839980c183fd063ffe',
        '5ae33f839980c183fd064000',
        '5ae33f839980c183fd064001',
        '5ae33f839980c183fd064002',
        '5ae33f839980c183fd064006',
        '5ae33f839980c183fd064007',
        '5ae33f839980c183fd064005',
        '5ae33f839980c183fd063fff',
        '5ae33f839980c183fd064003',
        '5ae33f839980c183fd06400b',
        '5ae33f839980c183fd06400c',
        '5ae33f839980c183fd06400a',
        '5ae33f839980c183fd064004',
        '5ae33f839980c183fd064008',
        '5ae33f839980c183fd064011',
        '5ae33f839980c183fd064010',
        '5ae33f839980c183fd06400f',
        '5ae33f839980c183fd064009',
        '5ae33f839980c183fd06400d',
        '5ae33f839980c183fd064016',
        '5ae33f839980c183fd064015',
        '5ae33f839980c183fd064014',
        '5ae33f839980c183fd06400e',
        '5ae33f839980c183fd064012',
        '5ae33f839980c183fd06401b',
        '5ae33f839980c183fd06401a',
        '5ae33f839980c183fd064019',
        '5ae33f839980c183fd064013',
        '5ae33f839980c183fd064017',
        '5ae33f839980c183fd06401f',
        '5ae33f839980c183fd064020',
        '5ae33f839980c183fd06401e',
        '5ae33f839980c183fd06401c',
        '5ae33f839980c183fd064018',
        '5ae33f839980c183fd064024',
        '5ae33f839980c183fd064023',
        '5ae33f839980c183fd06401d',
        '5ae33f839980c183fd064025',
        '5ae33f839980c183fd064029',
        '5ae33f839980c183fd064028',
        '5ae33f839980c183fd064021',
        '5ae33f839980c183fd064022',
        '5ae33f839980c183fd06402a',
        '5ae33f839980c183fd06402e',
        '5ae33f839980c183fd06402d',
        '5ae33f839980c183fd064026',
        '5ae33f839980c183fd064027',
        '5ae33f839980c183fd06402f',
        '5ae33f839980c183fd064033',
        '5ae33f839980c183fd064032',
        '5ae33f839980c183fd06402b',
        '5ae33f839980c183fd06402c',
        '5ae33f839980c183fd064034',
        '5ae33f839980c183fd064038',
        '5ae33f839980c183fd064037',
        '5ae33f839980c183fd064031',
        '5ae33f839980c183fd064030',
        '5ae33f839980c183fd064039',
        '5ae33f839980c183fd06403d',
        '5ae33f839980c183fd06403c',
        '5ae33f839980c183fd064035',
        '5ae33f839980c183fd064042',
        '5ae33f839980c183fd06403e',
        '5ae33f839980c183fd064041',
        '5ae33f839980c183fd064036',
        '5ae33f839980c183fd06403a',
        '5ae33f839980c183fd064043',
        '5ae33f839980c183fd064047',
        '5ae33f839980c183fd06403b',
        '5ae33f839980c183fd064046',
        '5ae33f839980c183fd06403f',
        '5ae33f839980c183fd064048',
        '5ae33f839980c183fd06404c',
        '5ae33f839980c183fd06404b',
        '5ae33f839980c183fd064040',
        '5ae33f839980c183fd064044',
        '5ae33f839980c183fd06404d',
        '5ae33f839980c183fd064051',
        '5ae33f839980c183fd064050',
        '5ae33f839980c183fd064045',
        '5ae33f839980c183fd064049',
        '5ae33f839980c183fd064052',
        '5ae33f839980c183fd064056',
        '5ae33f839980c183fd064055',
        '5ae33f839980c183fd06404e',
        '5ae33f839980c183fd06404a',
        '5ae33f839980c183fd064057',
        '5ae33f839980c183fd064053',
        '5ae33f839980c183fd06404f',
        '5ae33f839980c183fd064054',
        '5b1554924919630e0c3eacd9',
        '5b1554924919630e0c3eacdb',
        '5b1554924919630e0c3eacda',
        '5b1554924919630e0c3eacdc',
        '5b1554924919630e0c3eace7',
        '5b1554924919630e0c3eace8',
        '5b1554924919630e0c3eace5',
        '5b1554924919630e0c3eace6',
        '5b1554924919630e0c3eace9',
        '5b1554934919630e0c3ead2d',
        '5b1554934919630e0c3ead2e',
        '5b1554934919630e0c3ead30',
        '5b1554934919630e0c3ead2f',
        '5b1554934919630e0c3ead31',
        '5b5f44f335e93f6acf8aa864',
        '5b5f44f335e93f6acf8aa863',
        '5b5f49ca528c74705a77ea97',
        '5b64ac22e8d41a781cc0841c',
        '5b6b108a479d7138a73d3578'
        ]
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
        email: 'happytree@bobross.xxx'
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

  this.get('/employees', () => {
    return {
      employee: [{
        id:17,
        name:{
          first: 'jack',
          last: 'homer'
        },
        address: {
          'line1' : null,
          'line2' : null,
          'city' : null,
          'state' : null,
          'zip' : null
        },
        email: 'cheremy@gmail.com',

        permissions : [
          '5ae33f839980c183fd064029',
          '5b1554934919630e0c3ead2d',
          '5b1554934919630e0c3ead30',
          '5ae33f839980c183fd064004',
          '5ae33f839980c183fd064008',
          '5b1554924919630e0c3eace7',
          '5ae33f839980c183fd064019',
          '5ae33f839980c183fd064022',
          '5ae33f839980c183fd06402c',
          '5ae33f839980c183fd064030',
          '5ae33f839980c183fd064034',
          '5ae33f839980c183fd06403b',
          '5ae33f839980c183fd06403f',
          '5ae33f839980c183fd064043',
          '5ae33f839980c183fd064047',
          '5b1554934919630e0c3ead2e',
          '5b1554934919630e0c3ead31',
          '5b1554924919630e0c3eace8',
          '5ae33f839980c183fd064023',
          '5b1554934919630e0c3ead2f',
          '5ae33f839980c183fd06402d',
          '5ae33f839980c183fd064011'
        ]
      },
      {

      id:16,
      name:{
        first: 'Fred',
        last: 'Wayne'
      },
      address: {
        'line1' : null,
        'line2' : null,
        'city' : null,
        'state' : null,
        'zip' : null
      },
      email: 'cheremy@gmail.com',

      permissions : [
        '5ae33f839980c183fd064029',
        '5b1554934919630e0c3ead2d',
        '5b1554934919630e0c3ead30',
        '5ae33f839980c183fd064004',
        '5ae33f839980c183fd064008',
        '5b1554924919630e0c3eace7',
        '5ae33f839980c183fd064019',
        '5ae33f839980c183fd064022',
        '5ae33f839980c183fd06402c',
        '5ae33f839980c183fd064030',
        '5ae33f839980c183fd064034',
        '5ae33f839980c183fd06403b',
        '5ae33f839980c183fd06403f',
        '5ae33f839980c183fd064043',
        '5ae33f839980c183fd064047',
        '5b1554934919630e0c3ead2e',
        '5b1554934919630e0c3ead31',
        '5b1554924919630e0c3eace8',
        '5ae33f839980c183fd064023',
        '5b1554934919630e0c3ead2f',
        '5ae33f839980c183fd06402d',
        '5ae33f839980c183fd064011'
        ]
      }





      ]
    };
  });

  this.post('/companies');

  this.put('/companies/:id');

  this.post('/payment-methods');

  this.get('/bt/token', () => {
    return { token: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIzNmRkMjIzMDViZmE0NzQ5MGJkNWQ4MjQyYWQ1ODJmYWZlYTJkZTM3NDVjOGVhODc5NDA4ODM2NWNkNmZhMGU2fGNyZWF0ZWRfYXQ9MjAxOC0wNC0wMlQxODoyMDowNy43OTAxMTE4NzcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0' };
  });
}
