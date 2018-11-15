import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  _id () {
    let i = faker.random.number({
      min: 111111111111,
      max: 9999999999999
    });
    return i;
  },
  name: faker.commerce.department(),
  code: faker.random.number({
    min: 11,
    max: 99
  })
});