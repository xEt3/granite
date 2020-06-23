import { Factory } from 'ember-cli-mirage';
import faker from 'faker';
import moment from 'moment';

export default Factory.extend({
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
  collectEEO:            true,
  exposeBetaModules:     true,
  firstStepsCompletedOn: moment().subtract(1, 'hour').toISOString(),
  logoDominantColor: 'red',

  firstStepsCompleted: [
    'settings',
    'employees',
    'anatomy'
  ],

  disqualificationReasons: [
    'Better qualified candidates selected -- education',
    'Campaign on hold or eliminated',
    'Not willing to work hours',
    'Failed test',
    'Failed background check',
    'Company does not wish to sponsor work visa',
    'Accepted offer at another company',
    'Candidate applied to wrong position',
    'Compensation unacceptable',
    'Job does not meet career objectives',
    'Not willing to relocate',
    'No show to interview'
  ],

  afterCreate (company, server) {
    server.createList('corrective-action-severity', 3, { company });
  }
});
