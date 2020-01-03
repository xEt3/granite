import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  cannedType:        attr('string'),
  cannedSubmitted:   attr('date'),
  message:           attr('string'),
  signatureRequired: attr('boolean', { defaultValue: true }),
  signature:         attr('string'),
  readOn:            attr('date'),
  signedOn:          attr('date'),
  visibleToEmployee: attr('boolean', { defaultValue: true }),

  creator:             belongsTo('employee'),
  company:             belongsTo('company'),
  employee:            belongsTo('employee'),
  file:                belongsTo('file'),
  filledFile:          belongsTo('file'),
  supportingDocuments: hasMany('file'),
  fillFile:            attr(), // passthru for pojo data to fill pdf files
  followups:           hasMany('file'),
  effectiveOn:         attr('date'), // Placeholder for effective dated changes. This field is only here to pass along to the api

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
