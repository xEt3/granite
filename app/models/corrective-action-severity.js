import computed from 'ember-computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name:  attr('string'),
  order: attr('number'),
  formal: attr('boolean'),

  created: attr('date', {
    defaultValue: () => new Date()
  }),

  title: computed('name', 'order', function () {
    return `${this.get('name')} (${this.get('order')})`;
  })
});
