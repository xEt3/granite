import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({

  name:        attr('string'),
  description: attr('string'),
  logo:        attr('string'),

  costPerCycle: attr('number'),

  created: attr('date', { defaultValue: () => new Date() })
});
