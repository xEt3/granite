import { settled } from '@ember/test-helpers';
import { faker } from 'ember-cli-mirage';
import moment from 'moment';

const injectLogin = async function (server, properties = {}) {
  const authService = this.owner.lookup('service:auth');

  if (server.db.sessions.length > 0) {
    server.db.sessions.remove();
  }

  const company = server.create('company', Object.assign({
    urlKey: faker.random.number(),
    name: faker.company.companyName()
  }, properties.company));

  const employee = server.create('employee', Object.assign({
    company: company.id
  }, properties.employee));

  const session = server.create('session', {
    user: employee.id,
    company: company.id,
    token: '123',
    expires: moment().add(1, 'hour')
  });

  authService.set('session', session);
  await settled();

  return {
    company,
    employee
  };
};

export default injectLogin;
