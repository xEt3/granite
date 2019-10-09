import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  responses:         attr('array'),
  employee:          belongsTo('employee'),
  company:           belongsTo('company'),
  creator:           belongsTo('employee'),
  form:              belongsTo('form'),
  submittedOn:       attr('date'),
  notificationEmail: attr('string'),
  created:           attr('date')
});
