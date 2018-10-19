import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name: {
    first:  faker.name.firstName,
    middle: null,
    last:   faker.name.lastName,
    suffix: null
  },
  email:       faker.internet.email,
  phone:       faker.phone.phoneNumber,
  talentPools: [],
  created:     faker.date.past,
  __v:         0

});
