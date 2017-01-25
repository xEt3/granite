import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { RSVP: { Promise }, computed } = Ember;

export default Model.extend({
  title:             attr('string'),
  description:       attr('string'),

  company:           belongsTo('company-user'),
  creator:           belongsTo('user'),
  employee:          belongsTo('employee'),
  excludedEmployees: hasMany('employee'),
  severity:          attr('string'),
  resolvedOn:        attr('date'),


  created: attr('date', {
    defaultValue: () => new Date()
  }),

  actionSeverity: computed('severity', 'company', function () {
    let severity = this.get('severity');

    if ( severity ) {
      return Promise.resolve(this.get('company'))
      .then(c => c.get('correctiveActionSeverities').findBy('id', severity));
    }

    return null;
  })
});
