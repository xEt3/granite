import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName:                 faker.name.firstName(),
  lastName:                  faker.name.lastName(),
  picture:                   null,
  phone:                     faker.phone.phoneNumberFormat,
  email:                     faker.internet.email,
  addressLine1:              faker.address.streetAddress,
  addressCity:               faker.address.city,
  addressState:              faker.address.state,
  addressZip:                faker.address.zipCode,
  emergencyContactNameFirst: faker.name.firstName,
  emergencyContactNameLast:  faker.name.lastName,
  company:                   null,
  companyUser:               null,
  customFields:              { [faker.hacker.noun]: faker.random.word },
  ssn:                       '123-12-4444',
  dateOfBirth:               faker.date.past,
  jobTitle:                  faker.name.jobTitle,
  fullName () {
    return this.firstName + ' ' + this.lastName;
  }
});
