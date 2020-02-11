import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: faker.commerce.department(),
  code: faker.random.number({
    min: 11,
    max: 99
  })
});
