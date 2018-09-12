import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name: faker.company.companyName,
  contactPhone: '4044448888',
  contactFirstName: 'Jeremy',
  contactLastName: 'Cherer',
  email: 'bahaha@test.com',
  addressLine1: '3220 4th ave N',
  addressCity: 'Billings',
  addressState: 'Montana',
  addressZipCode: 59101,
  urlPrefix: faker.random.word,
  firstStepsCompletedOn: moment().subtract(1, 'hour').toISOString(),

  firstStepsCompleted: [
    'settings',
    'employees',
    'anatomy'
  ],

  afterCreate (company, server) {
    server.createList('corrective-action-severity', 3, { company });
  }
});
