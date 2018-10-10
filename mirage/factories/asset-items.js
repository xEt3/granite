import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  created: faker.date.past,
  identifier () {
    return `SN: ${faker.random.number({ min: 1111 })}`;
  }
});
