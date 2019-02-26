import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.commerce.department(),
  code: faker.random.number({
    min: 11,
    max: 99
  })
});
