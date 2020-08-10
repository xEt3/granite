import { Factory } from 'ember-cli-mirage';
import faker from 'faker';


export default Factory.extend({
  name:        faker.random.word,
  description: faker.hacker.phrase,
  costPerDay:  faker.random.number,
  company:     null,
  creator:     null
});
