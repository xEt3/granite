import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: {
    firstName: faker.name.firstName(),
    lastName:  faker.name.lastName()
  },
  picture: null,
  phone:   faker.phone.phoneNumber,
  email:   faker.internet.email,
  address: {
    line1: faker.address.streetAddress,
    city:  faker.address.city,
    state: faker.address.state,
    zip:   faker.address.zipCode
  },
  emergencyContact: {
    name: {
      first: faker.name.firstName,
      last:  faker.name.lastName
    }
  },
  company:      null,
  companyUser:  null,
  customFields: { [faker.hacker.noun]: faker.date.past },
  ssn:          '123-12-4444',
  dateOfBirth:  faker.date.past,
  id:           faker.random.number
});
