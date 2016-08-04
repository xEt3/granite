import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  employee: belongsTo('employee'),
  assigner: belongsTo('company-user'),
  created:  attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
