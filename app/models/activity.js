import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actor:   belongsTo(),
  action:  attr('string'),
  target:  belongsTo(),
  icon:    attr('string'),

  company: belongsTo('company'),


  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
