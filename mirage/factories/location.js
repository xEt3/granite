import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
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
