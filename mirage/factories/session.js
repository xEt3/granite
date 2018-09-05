import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  token: faker.commerce.department() + faker.commerce.productAdjective(),
  expires: moment().add(1, 'hour').toISOString(),
  user: null
});
