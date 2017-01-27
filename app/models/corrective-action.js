import Ember from 'ember';
import computed from 'ember-computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { RSVP: { Promise } } = Ember;

export default Model.extend({
  description: attr('string'),
  type:        attr('string'),

  company:           belongsTo('company'),
  creator:           belongsTo('company-user'),
  employee:          belongsTo('employee'),
  employeeIssue:     belongsTo('employee-issue'),
  excludedEmployees: hasMany('employee'),

  issuedOn:      attr('date'),
  followUpOn:    attr('date'),
  notes:         attr('string'),
  followUpNotes: attr('string'),
  didResolve:    attr('boolean'),

  created: attr('date', {
    defaultValue: () => new Date()
  }),

  actionSeverity: computed('severity', 'company', function () {
    let severity = this.get('severity');

    if ( severity ) {
      return Promise.resolve(this.get('company'))
      .then(c => c.get('correctiveActionSeverities.content').findBy('id', severity));
    }

    return null;
  })
});
