import { Factory, faker, association } from 'ember-cli-mirage';

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

  // job: trait({
  //   title:       faker.name.jobTitle,
  //   description: faker.lorem.paragraph
  // })
  job: null
  // job: association('job'),

  // afterCreate (jobs, server) {
  //   server.createList('job', 2, {
  //     jobs,
  //     title: jobs.title
  //   });
  // }

  // afterCreate (jobOpening, db) {
  //   db.create('job', {
  //     jobOpening,
  //     title: jobOpening.title
  //   });
  // }
});
