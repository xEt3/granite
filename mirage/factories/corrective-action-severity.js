import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.random.word(),
  order: (i) => i,
  formal: false
});
