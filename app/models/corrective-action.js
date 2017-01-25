import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  description: attr('string'),
  type:        attr('string'),
  company:           belongsTo('company'),
  creator:           belongsTo('company-user'),
  employee:          belongsTo('employee'),
  excludedEmployees: hasMany('employee'),
  issuedOn:      attr('date'),
  followUpOn:    attr('date'),
  notes:         attr('string'),
  followUpNotes: attr('string'),
  didResolve:    attr('boolean'),

  created:      attr('date', {
    defaultValue: () => new Date()
  })
});
