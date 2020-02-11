import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

const items =
[
  'mobile',
  'tablet',
  'desktop',
  'laptop',
  'car',
  'lab',
  'configure',
  'asterisk',
  'cube',
  'sound',
  'photo'
];

export default Factory.extend({
  attributes:  [ faker.commerce.color ],
  created:     faker.date.past,
  description: faker.hacker.phrase,
  name:        faker.hacker.noun,
  sharable:    faker.random.boolean,
  icon () {
    let i = faker.random.number({
      min: 1,
      max: 11
    });
    return items[i];
  }
});
