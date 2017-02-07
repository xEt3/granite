import Ember from 'ember';
import computed from 'ember-computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { RSVP: { Promise } } = Ember;

export default Model.extend({
  title:             attr('string'),

  company:           belongsTo('company', { inverse: null }),
  creator:           belongsTo('employee', { async: false, inverse: null }),
  employee:          belongsTo('employee', { inverse: null }),
  excludedEmployees: hasMany('employee', { inverse: null }),
  severity:          attr('string'),
  resolvedOn:        attr('date'),
  type:              attr('string'),

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
  }),

  slug: computed('id', 'title', function () {
    return `${this.get('title').replace(/\s|_/g, '-')}_${this.get('id')}`;
  })
});
