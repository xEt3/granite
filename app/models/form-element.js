import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { A } from '@ember/array';

export default Model.extend({
  label:   attr('string'),
  type:    attr('string'),
  options: attr('array', { defaultValue: () => A() }),

  trueWeight:  attr('number'),
  falseWeight: attr('number'),

  trueDisqualifies:  attr('boolean'),
  falseDisqualifies: attr('boolean'),
  allowAdditions:    attr('boolean'),
  multiple:          attr('boolean'),

  created: attr('date', { defaultValue: () => new Date() })
});
