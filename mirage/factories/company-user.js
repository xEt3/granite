import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id:         faker.random.number(),
  firstName:  faker.name.firstName(),
  lastName:   faker.name.lastName(),
  email:      faker.internet.email(),
  password:   faker.random.number(),
  shownHints: [
    'recruiting-campaigns-index',
    'employees-index',
    'documents',
    'job-description-index',
    'job-description-new',
    'counseling-index'
  ]
});
