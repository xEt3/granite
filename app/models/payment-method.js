import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  nonce:   attr('string'),
  company: belongsTo('company', {
    async:   true,
    inverse: false
  }),
  created: attr('date', { defaultValue: () => new Date() })
});
