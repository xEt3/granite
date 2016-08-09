import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name:        attr('string'),
  description: attr('string'),
  icon:        attr('string'),
  sharable:    attr('boolean'),

  creator:     belongsTo('company-user'),
  company:     belongsTo('company'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
