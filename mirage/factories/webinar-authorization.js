import { Factory } from 'ember-cli-mirage';
import moment from 'moment';
import faker from 'faker';

export default Factory.extend({
  expiration: moment().add(90, 'days').toISOString(),
  created:    faker.date.past
});
