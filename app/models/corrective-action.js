import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { formalActionSuggestions } from 'granite/config/suggestions';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';

export default Model.extend({
  type: attr('string'),

  descriptionIssues:       attr('string'),
  descriptionExpectations: attr('string'),
  descriptionConsequences: attr('string', { defaultValue: formalActionSuggestions.consequences }),

  company: belongsTo('company'),
  creator: belongsTo('employee', {
    async:   true,
    inverse: null
  }),
  employee:          belongsTo('employee'),
  employeeIssue:     belongsTo('employee-issue'),
  excludedEmployees: hasMany('employee'),
  followUps:         hasMany('corrective-action-followup'),
  severity:          attr('string'),

  notes:              attr('string'),
  followUpNotes:      attr('string'),
  didResolve:         attr('boolean'),
  followUpOn:         attr('date'),
  resolutionStatusOn: attr('date'),
  documents:          hasMany('file'),

  issuedOn: attr('date', { defaultValue: () => new Date() }),

  created: attr('date', { defaultValue: () => new Date() }),

  actionSeverity: computed('severity', 'company', function () {
    let severity = this.get('severity');

    if (severity) {
      return Promise.resolve(this.get('company'))
      .then(c => c.get('correctiveActionSeverities.content').findBy('id', severity));
    }

    return null;
  })
});
