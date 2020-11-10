import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
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
  ],

  fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
});
