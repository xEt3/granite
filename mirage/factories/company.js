import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name: 'Test Company',
  contactPhone: '4044448888',
  contactFirstName: 'Jeremy',
  contactLastName: 'Cherer',
  email: 'bahaha@test.com',
  addressLine1: '3220 4th ave N',
  addressCity: 'Billings',
  addressState: 'Montana',
  addressZipCode: 59101,
  urlPrefix: 'gogo',
  firstStepsCompleted: [
    'settings',
    'employees',
    'anatomy'
  ],
  firstStepsCompletedOn: moment().subtract(1, 'hour').toISOString()
});
