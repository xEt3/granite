import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  created: faker.date.past,
  _id:     faker.random.number({ min: 111111111111, max: 9999999999999 }),
  identifier() {
    return `SN: ${faker.random.number({ min: 1111 })}`;
  }
});
