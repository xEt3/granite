import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName:   faker.name.firstName,
  middleName:  null,
  lastName:    faker.name.lastName,
  suffixName:  null,
  email:       faker.internet.email,
  phone:       faker.phone.phoneNumber,
  talentPools: [],
  created:     faker.date.past
});
