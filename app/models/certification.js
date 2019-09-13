import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  note: attr('string'),

  renewalPeriodAmount: attr('number', { defaultValue: 1 }), // 1
  renewalPeriodUnit:   attr('string', { defaultValue: 'years' }), // year
  nextRenewalDate:     attr('date'),
  renews:              attr('boolean'),
  renewals:            hasMany('renewal'),
  requiresDocument:    attr('boolean'),
  initialDate:         attr('date'),

  document: belongsTo('file'),
  company:  belongsTo('company'),
  creator:  belongsTo('employee'),
  employee: belongsTo('employee'),

  documentUploadedOn: attr('date'),
  created:            attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
