import { Factory } from 'ember-cli-mirage';
import moment from 'moment';
import faker from 'faker';

export default Factory.extend({
  token:           faker.commerce.department() + faker.commerce.productAdjective(),
  expires:         moment().add(1, 'hour').toISOString(),
  esAuthenticated: true,
  user:            null,
  company:         null
});
