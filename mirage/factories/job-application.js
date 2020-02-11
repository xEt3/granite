import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  coverLetter:           null,
  stageOrder:            0,
  manualEntry:           true,
  disqualified:          false,
  disqualificationEmail: false,
  scoreAdditive:         null,
  scoreRelative:         null,
  hired:                 false,
  hiredSetOn:            null,
  // reviewedOn:            faker.date.past,
  created:               faker.date.past,
  completedOn:           faker.date.past,
  resume:                null,
  employee:              null,
  hiredSetBy:            null
});
