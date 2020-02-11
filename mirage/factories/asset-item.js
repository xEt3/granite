import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  created: faker.date.past,
  identifier () {
    return `SN: ${faker.random.number({ min: 1111 })}`;
  }
});
