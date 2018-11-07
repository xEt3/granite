import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  _id: () => faker.random.number({
    min: 111111111111,
    max: 9999999999999
  }),

  addressLine1: faker.address.streetAddress(),
  addressCity:  faker.address.city(),
  addressState: faker.address.state(),
  addressZip:   faker.address.zipCode(),

  name: faker.address.state,
  code: faker.random.number({
    min: 11,
    max: 99
  })
});
