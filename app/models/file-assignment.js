import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  message:           attr('string'),
  signatureRequired: attr('boolean'),
  signature:         attr('string'),
  readOn:            attr('date'),
  signedOn:          attr('date'),
  visibleToEmployee: attr('boolean', { defaultValue: true }),

  creator:     belongsTo('employee'),
  company:     belongsTo('company'),
  employee:    belongsTo('employee'),
  file:        belongsTo('file'),
  followups:   hasMany('file'),
  effectiveOn: attr('date'), // Placeholder for effective dated changes. This field is only here to pass along to the api


  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
