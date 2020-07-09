import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  formType:         null,
  title:    'sdsdsdsd',
  description:         null,
  created:       faker.date.past(),
  excludedUsers: []
});
