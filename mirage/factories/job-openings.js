import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  name:                      faker.name.title,
  title:                     faker.name.jobTitle,
  description:               faker.name.jobDescriptor,
  availableInternally:       true,
  internalDuration:          null,
  positions:                 faker.random.number,
  sendApplicantConfirmation: false,
  sendCloseNotice:           false,
  allocateTalentPool:        false,
  applicantScoring:          false,
  closed:                    false,
  jobType:                   null,
  supervisoryRequirements:   false,
  setup:                     false,
  completedSetup:            faker.date.past,
  startOn:                   faker.date.past,
  completedOn:               null,
  created:                   faker.date.past,
  location:                  null,
  hiring:                    false,

  job: association(),

  afterCreate (jobOpening, db) {
    db.create('job', {
      jobOpening,
      title: jobOpening.title
    });
  }
});
