import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default Model.extend({
  coverLetter:            attr('string'),
  responses:              attr('array'),
  stage:                  attr('string'),
  stageOrder:             attr('number'),
  manualEntry:            attr('boolean'),
  disqualified:           attr('boolean'),
  disqualificationReason: attr('string'),
  disqualificationEmail:  attr('boolean'),
  scoreAdditive:          attr('number'),
  scoreRelative:          attr('number'),
  notes:                  attr('string'),
  publicLink:             attr('string'),
  labels:                 hasMany('label'),

  resume: belongsTo('file', {
    async:   true,
    inverse: null
  }),
  jobOpening: belongsTo('job-opening', {
    async:   true,
    inverse: null
  }),
  applicant: belongsTo('applicant', {
    async:   true,
    inverse: null
  }),
  employee: belongsTo('employee', {
    async:   true,
    inverse: null
  }),

  person: computed('applicant', 'employee.id', function () {
    return this.get('employee.id') ? this.employee : this.applicant;
  }),

  hired:      attr('boolean'),
  hiredSetOn: attr('date'),
  hiredSetBy: belongsTo('employee', {
    async:   true,
    inverse: null
  }),
  autoOnboarding: attr('boolean'),

  completedOn: attr('date'),
  reviewedOn:  attr('date'),
  created:     attr('date', { defaultValue: () => new Date() }),

  isScored: computed('scoreAdditive', 'scoreRelative', 'responses', function () {
    return !isNaN(this.scoreAdditive) && !isNaN(this.scoreRelative) && !!this.get('responses.firstObject');
  }),

  scoreAbs: computed('scoreRelative', function () {
    const v = this.scoreRelative;
    return v ? v > 100 ? 100 : v < 0 ? 0 : v : v;
  }),

  isEmployee: computed.bool('employee.id')
});
