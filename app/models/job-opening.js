import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import moment from 'moment';

export default Model.extend({
  name:        attr('string'),
  title:       attr('string'),
  description: attr('string'),

  availableInternally: attr('boolean'),
  internalDuration:    attr('number'), // number of days that this job is internally available before posting to outside sources
  positions:           attr('number', { defaultValue: 1 }), // number of positions to fill
  sendCloseNotice:     attr('boolean'), // send an email to unrejected talent when job closes
  allocateTalentPool:  attr('boolean'), // allocate unrejected, not hired talent to the pool
  applicantScoring:    attr('boolean'),
  closed:              attr('boolean'),

  jobType:                 attr('string'),
  eeoCategory:             attr('string'),
  supervisoryRequirements: attr('boolean'),

  setup:          attr('boolean', { defaultValue: true }),
  setupStep:      attr('number'),
  setupProgress:  attr('number'),
  completedSetup: attr('date'),

  job:                    belongsTo('job'),
  company:                belongsTo('company'),
  creator:                belongsTo('employee'),
  location:               belongsTo('location'),
  screening:              belongsTo('form'),
  subscribers:            hasMany('employee'),
  applicantSources:       hasMany('applicant-source'),
  manualApplicantSources: hasMany('manual-applicant-source'),
  emailSubscribers:       attr('array'),

  startOn:     attr('date'),
  endOn:       attr('date'),
  dueOn:       attr('date'),
  completedOn: attr('date'),

  created: attr('date', { defaultValue: () => new Date() }),

  hiring: computed('completedSetup', 'completedOn', 'startOn', 'endOn', function () {
    let now = moment(),
        props = this.getProperties('completedSetup', 'completedOn', 'startOn', 'endOn');

    return !!(props.completedSetup && !props.completedOn && (!props.endOn || now.isBefore(props.endOn)) && (!props.startOn || now.isAfter(props.startOn)));
  }),

  slug: computed('id', 'title', function () {
    let title = this.get('title') || '';
    return `${title.replace(/[\s]/g, '-')}_${this.get('id')}`;
  })
});
