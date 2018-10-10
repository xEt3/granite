import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  id:                    1,
  name:                  faker.company.companyName,
  contactPhone:          faker.phone.phoneNumber(),
  contactFirstName:      faker.name.firstName(),
  contactLastName:       faker.name.lastName(),
  email:                 faker.internet.email(),
  addressLine1:          faker.address.streetAddress(),
  addressCity:           faker.address.city(),
  addressState:          faker.address.state(),
  addressZipCode:        faker.address.zipCode(),
  urlPrefix:             faker.random.word,
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
