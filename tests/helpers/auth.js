import moment from 'moment';
import { faker } from 'ember-cli-mirage';

export default function authenticate(app, data, server, properties = {}) {
  let auth = app.__container__ ? app.__container__.lookup('service:auth') : app.owner.lookup('service:auth');

  console.log('1. auth in helper', auth);


  const company = server.create('company', Object.assign({
    urlPrefix: faker.random.number(),
    name: faker.company.companyName()
  }, properties.company));

  const companyUser = server.create('company-user', Object.assign({
    company: company.id
  }, properties.companyUser));

  auth.set('session', server.create('session', {
    token: faker.commerce.department() + faker.commerce.productAdjective(),
    user: companyUser.id,
    expires: moment().add(1, 'hour').toISOString(),
    id: 1
  }));

  console.log('???', auth.get('session.user'));

  return {
    company,
    companyUser
  };
}
