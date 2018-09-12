import DS from 'ember-data';
const { belongsTo, attr } = DS;

export default DS.Model.extend({
  name:        attr('string'),
  description: attr('string'),
  costPerDay:  attr('number'),

  company: belongsTo('company'),
  creator: belongsTo('employee'),

  created: attr('date', { defaultValue: () => new Date() })
});
