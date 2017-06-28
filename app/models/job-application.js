import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  coverLetter:  attr('string'),
  responses:    attr('array'),
  stage:        attr('string'),
  stageOrder:   attr('number'),
  disqualified: attr('boolean'),

  resume:     belongsTo('file', { async: true, inverse: null }),
  jobOpening: belongsTo('job-opening'),
  applicant:  belongsTo('applicant', { async: true, inverse: null }),
  employee:   belongsTo('employee', { async: true, inverse: null }),

  person: computed('applicant', 'employee', function () {
    return this.get('employee') || this.get('applicant');
  }),

  reviewedOn: attr('date'),
  created: attr('date', {
    defaultValue: () => new Date()
  })
});
