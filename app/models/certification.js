import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  note: attr('string'),

  renewalPeriodAmount: attr('number'), // 1
  renewalPeriodUnit:   attr('number'), // year
  nextRenewalDate:     attr('date'),
  renewals:            attr('array'), // probably needs to be a relationship w/ embedded records

  document: belongsTo('file'),
  company:  belongsTo('company'),
  creator:  belongsTo('employee'),
  employee: belongsTo('employee'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
