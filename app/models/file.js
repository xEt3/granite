import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validations from './validations/employee';

export default Model.extend(Validations, {
  title:       attr('string'),
  description: attr('string'),

  objectPath:     attr('string'),
  extension:      attr('string'),
  mimeType:       attr('string'),
  url:            attr('string'),
  directory:      attr('string'),
  key:            attr('string'),
  associatedData: attr(),

  creator: belongsTo('company-user', { async: true, inverse: null }),
  company: belongsTo('company', { async: true, inverse: null }),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
