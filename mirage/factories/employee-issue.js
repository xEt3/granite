import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title:         faker.hacker.phrase(),
  resolvedOn:    null,
  type:          'Performance',
  created:       faker.date.past(),
  excludedUsers: []
});
