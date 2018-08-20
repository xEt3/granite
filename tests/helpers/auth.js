import { settled } from '@ember/test-helpers';
import { faker } from 'ember-cli-mirage';

const injectLogin = async function (server, properties = {}) {
  const sessionService = this.owner.lookup('service:auth');

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

  await sessionService.createSession(server.create('session', { user: employee.id, company: company.id }));
  await settled();

  return {
    company,
    employee
  };
};

export default injectLogin;
