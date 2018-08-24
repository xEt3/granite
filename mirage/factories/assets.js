import { Factory, faker } from 'ember-cli-mirage';

const items = ['mobile', 'tablet', 'desktop', 'laptop',
  'car', 'lab', 'configure', 'asterisk', 'cube', 'sound', 'photo' ];

export default Factory.extend({
  attributes:   [faker.commerce.color],
  created:     faker.date.past,
  description: faker.hacker.phrase,
  _id() {
    let i = faker.random.number({min:111111111111, max:9999999999999});
    return i;
  },
  name:        faker.hacker.noun,
  sharable:    faker.random.boolean,
  icon () {
    let i = faker.random.number({min:1, max:11});
    return items[i];
  }
});
