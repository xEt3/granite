import { Factory } from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name:           faker.random.words(),
  setup:          true,
  completedSetup: moment(),
  job:            null,
  company:        null
});
