import { Factory, faker } from 'ember-cli-mirage';

const priorityNumbers = [ 1, 2, 3, 4, 5 ];

export default Factory.extend({
  _id:         faker.random.number(),
  title:       faker.hacker.noun(),
  description: faker.lorem.sentence(),
  priority (i) {
    return priorityNumbers[i];
  },
  completedOn:   null,
  cancelledOn:   null,
  dueOn:         null,
  delayedUntil:  null,
  remindOn:      null,
  created:       new Date(),
  checklist:     [],
  prerequisites: [],
  subscribers:   [],
  __v:           0
});