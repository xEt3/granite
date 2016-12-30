import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  job: belongsTo('job'),
  company: belongsTo('company'),
  creator: belongsTo('employee'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
