import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name:                faker.name.title,
  title:               faker.name.jobTitle,
  description:         faker.name.jobDescriptor,
  availableInternally: false,
  internalDuration:    null,
  positions:           faker.random.number({
    min: 1,
    max: 9
  }),
  sendApplicantConfirmation: false,
  sendCloseNotice:           false,
  allocateTalentPool:        false,
  applicantScoring:          false,
  closed:                    false,
  jobType:                   null,
  supervisoryRequirements:   false,
  setup:                     false,
  // completedSetup:            faker.date.past,
  startOn:                   faker.date.past,
  completedOn:               null,
  created:                   faker.date.past,
  location:                  null,
  hiring:                    false,
  job:                       null,
  subscribers:               [],
  screening:                 null
});
