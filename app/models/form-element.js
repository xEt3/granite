import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { A } = Ember;

export default Model.extend({
  label: attr('string'),
  type: attr('string'),
  options: attr('array', {
    defaultValue: () => A()
  }),

  allowAdditions: attr('boolean'),
  multiple: attr('boolean'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
