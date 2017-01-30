import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/job';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend(Validations, {
  title:       attr('string'),
  description: attr('string'),
  category:    attr('string'),

  company:    belongsTo('company'),
  creator:    belongsTo('employee'),
  department: belongsTo('department'),
  assets:     hasMany('asset'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
