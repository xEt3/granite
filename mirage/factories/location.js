import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  _id () {
    let i = faker.random.number({
      min: 111111111111,
      max: 9999999999999
    });
    return i;
  },
  addressLine1:   faker.address.streetAddress(),
  addressCity:    faker.address.city(),
  addressState:   faker.address.state(),
  addressZipcode: faker.address.zipCode(),
  phone:          faker.phone.phoneNumber,

  name: faker.address.state,
  code: faker.random.number({
    min: 11,
    max: 99
  })
});
