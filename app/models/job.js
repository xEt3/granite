import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/job';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend(Validations, {
  title: attr('string'),
  description: attr('string'),

  company: belongsTo('company'),
  creator: belongsTo('employee'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
