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
  firstStepsCompletedOn: moment().subtract(1, 'hour').toISOString(),
  correctiveActionSeverities: [
    {
      name: 'Verbal Warning',
      order: 1,
      formal: false,
      _id: 1
    }, {
      name: 'Written Warning',
      order: 2,
      formal: true,
      _id: 2
    }, {
      name: 'Termination',
      order: 3,
      formal: true,
      _id: 3
    }
  ]
});
