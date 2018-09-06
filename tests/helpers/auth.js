import { settled } from '@ember/test-helpers';
import { faker } from 'ember-cli-mirage';
import { computed } from '@ember/object';
import moment from 'moment';
import EmberObject from '@ember/object';

const injectLogin = async function (server, properties = {}) {
  const authService = this.owner.lookup('service:auth');

  if (server.db.sessions.length > 0) {
    server.db.sessions.remove();
  }

  const company = server.create('company', Object.assign({
    name: faker.company.companyName(),
    urlPrefix: faker.random.number()
  }, properties.company));

  const companyToPassAuth = EmberObject.create({
    name: company.name,
    urlPrefix: company.urlPrefix,
    id: company.id,
    firstStepsCompleted: [
      'settings',
      'employees',
      'anatomy'
    ]
  });

  const companyUser = server.create('company-user', Object.assign({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: companyToPassAuth
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
  authService.set('user', computed('', function () {
    console.log('inside computed property');
    let x = server.db.companyUsers.find(companyUser.id);
    console.log('returning companyUser:', x);
    return x;
    //CHANGE TO EMBER OBJECT HERE INSTEAD OF HAVING TWO COMPANIES UP TOP?
  }));
  await settled();

  return {
    company,
    companyUser,
    employee
  };
};

export default injectLogin;
