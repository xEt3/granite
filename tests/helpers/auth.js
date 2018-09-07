import { settled } from '@ember/test-helpers';
import { faker } from 'ember-cli-mirage';
import moment from 'moment';

const injectLogin = async function (server, properties = {}) {
  const authService = this.owner.lookup('service:auth');

  if (server.db.sessions.length > 0) {
    server.db.sessions.remove();
  }

  const company = server.create('company', Object.assign({
    name: faker.company.companyName(),
    urlPrefix: faker.random.number(),
    firstStepsCompleted: [
      'settings',
      'employees',
      'anatomy'
    ]
  }, properties.company));

  const companyUser = server.create('company-user', Object.assign({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: company.id
  }, properties.companyUser));

  const employee = server.create('employee', Object.assign({
    company: company.id,
    companyUser: companyUser.id,
    firstName: companyUser.firstName,
    lastName: companyUser.lastName
  }, properties.employee));

  const session = server.create('session', {
    user: companyUser.id,
    company: company.id,
    token: '123',
    expires: moment().add(1, 'hour')
  });

  companyUser.update('employee', employee.id);
  authService.set('session', session);
  await settled();

  return {
    company,
    companyUser,
    employee
  };
};

export default injectLogin;
