import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/job';

export default Model.extend(Validations, {
  title: attr('string'),
  description: attr('string'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
