import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  coverLetter:           null,
  stage:                 null,
  stageOrder:            null,
  manualEntry:           true,
  disqualified:          false,
  disqualificationEmail: false,
  scoreAdditive:         null,
  scoreRelative:         null,
  hired:                 false,
  hiredSetOn:            null,
  reviewedOn:            null,
  created:               faker.date.past,
  resume:                null,
  employee:              null,
  hiredSetBy:            null
});
