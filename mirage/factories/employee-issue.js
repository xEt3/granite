import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title:         faker.hacker.phrase(),
  resolvedOn:    null,
  type:          'Performance',
  created:       faker.date.past(),
  excludedUsers: []
});
