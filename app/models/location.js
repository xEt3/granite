import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({

  name: attr('string'),
  code: attr('string'),

  company: belongsTo('company'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
