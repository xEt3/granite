import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  message:           attr('string'),
  signatureRequired: attr('boolean'),
  signature:         attr('string'),
  readOn:            attr('date'),
  signedOn:          attr('date'),
  creator:           belongsTo('employee'),
  company:           belongsTo('company'),
  employee:          belongsTo('employee'),
  file:              belongsTo('file'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
