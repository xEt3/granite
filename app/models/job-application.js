import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  jobOpening: belongsTo('job-opening'),
  applicant: belongsTo('applicant'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
