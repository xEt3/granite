import { Factory } from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName(),
  lastName:  faker.name.lastName(),
  email:     faker.internet.email(),
  password:  faker.random.number()
});
