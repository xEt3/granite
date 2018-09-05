import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  company : null,
  employee: null,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: 'test@test.org',
  password: 'password'
});
