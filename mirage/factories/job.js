import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title:       faker.name.jobTitle,
  description: faker.lorem.paragraph(),
  category:    'Non-Profit/Volunteering',
  created:     faker.date.past
});
