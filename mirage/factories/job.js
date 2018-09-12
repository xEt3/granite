import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title:       faker.name.jobTitle,
  description: faker.lorem.paragraph
});
