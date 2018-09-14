import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  changes:     attr('array'),
  applied:     attr('boolean'),
  reviewedOn:  attr('date'),
  effectiveOn: attr('date'),

  appliedBy: belongsTo('employee', {
    async:   true,
    inverse: null
  }),
  company: belongsTo('company', {
    async:   true,
    inverse: null
  }),
  employee: belongsTo('employee', {
    async:   true,
    inverse: null
  }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
