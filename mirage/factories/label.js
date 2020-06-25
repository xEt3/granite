import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  color:   'red',
  text:    faker.name.jobTitle,
  created: faker.date.past()
});
