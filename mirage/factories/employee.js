import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  company:     null,
  firstName:   faker.name.firstName(),
  lastName:    faker.name.lastName(),
  companyUser: null
});
