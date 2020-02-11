import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title:       faker.name.title,
  description: faker.hacker.phrase,
  price:       60,
  created:     faker.date.past
});
