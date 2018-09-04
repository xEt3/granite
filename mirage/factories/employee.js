import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  company : null,

  init() {
    this.email = 'test@test.org';
    this.name = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      suffix: null
    };
  }
});
