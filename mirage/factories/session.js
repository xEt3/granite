import { Factory } from 'ember-cli-mirage';
import moment from 'moment';
import Faker from 'ember-cli-mirage/faker';

export default Factory.extend({
  token:           Faker.commerce.department() + Faker.commerce.productAdjective(),
  expiration:      moment().add(1, 'hour').toISOString(),
  esAuthenticated: true,
  user:            null,
  company:         null
});
