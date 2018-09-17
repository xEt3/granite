import moment from 'moment';
import { Response, faker } from 'ember-cli-mirage';

const parseIncoming = req => {
  return req.requestBody ? JSON.parse('{"' + decodeURIComponent(req.requestBody).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {};
};

// HACK - mirage is incapable of handling incoming embedded records https://github.com/samselikoff/ember-cli-mirage/issues/797#issuecomment-233115924
// this function correctly handles embedded changes & additions
const processEmbeddedRelationships = ({ model, key, data, parentId, parentKey, parentModel }) => {
  let relationshipData = data[key];

  if (!Array.isArray(relationshipData)) {
    relationshipData = [ relationshipData ];
  }

  return relationshipData.map(record => {
    let idVal = record.id || record._id;

    return idVal ?
      model.find(idVal).update(record) :
      model.create(Object.assign({}, record, { [parentKey]: parentModel.find(parentId) }));
  });
};

export default function () {
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
  this.post('/login/company-user', (db, request) => {
    const params = parseIncoming(request);

    let userExists = db.companyUsers.where({
      email:    params.email,
      password: params.password
    });

    if (userExists && userExists.models[0]) {
      let session = db.sessions.create({
        token:   faker.commerce.department() + faker.commerce.productAdjective(),
        expires: moment().add(1, 'hour').toISOString(),
        user:    userExists.models[0].id,
        company: userExists.models[0].company
      });
      return session.attrs;
    }
    return new Response(401, {}, 'User not found');
  });

  this.get('/activities', (n, request) => {
    const params = parseIncoming(request),
          limit = params.limit || 10;
    let activities = [];
    for (let i = 0; i < limit; i++) {
      activities.push({
        _id:             i + 21,
        descriptionHtml: faker.fake('{{name.firstName}} {{hacker.verb}} {{hacker.noun}}')
      });
    }
    return { activity: activities };
  });

  this.get('/company/:id/billing', (/*db, request*/) => {
    return { subscription: null }; //works for now
  });

  this.put('/companies/:id', function ({ companies, correctiveActionSeverities }, request) {
    //needs to be like this because mirage is incapable of processing embedded relationships
    let id = request.params.id,
        attrs = this.normalizedRequestAttrs();

    attrs.correctiveActionSeverities = processEmbeddedRelationships({
      model:       correctiveActionSeverities,
      key:         'correctiveActionSeverities',
      data:        attrs,
      parentId:    id,
      parentKey:   'company',
      parentModel: companies
    });

    return companies.find(id).update(attrs);
  });

  this.get('/recruiting-pipelines');
  this.put('recruiting-pipelines/:id');
  this.get('/employees');
  this.get('/employees/:id');
  this.get('/company-users');
  this.post('/company-users');
  this.get('/company-users/:id');
  this.put('/company-users/:id');
  this.post('/companies');
  this.get('/companies/:id');
  this.get('/permissions');
  this.get('/action-items');
  this.get('/asset-items');
  this.get('/assets');
  this.get('/changes');
  this.get('/histories');
  this.get('/employee-issues');
  this.get('/departments');
  this.get('/locations');
  this.post('/payment-methods');
  this.get('/bt/token', () => {
    return { token: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIzNmRkMjIzMDViZmE0NzQ5MGJkNWQ4MjQyYWQ1ODJmYWZlYTJkZTM3NDVjOGVhODc5NDA4ODM2NWNkNmZhMGU2fGNyZWF0ZWRfYXQ9MjAxOC0wNC0wMlQxODoyMDowNy43OTAxMTE4NzcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0' };
  });
}
