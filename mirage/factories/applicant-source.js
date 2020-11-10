import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name:         faker.random.word,
  description:  faker.hacker.phrase,
  costPerCycle: faker.random.number
});
