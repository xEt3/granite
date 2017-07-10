import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  stages: attr('array'),

  jobOpenings: hasMany('job-opening', { inverse: null }),
  company: belongsTo('company', { inverse: null }),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
