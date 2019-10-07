import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import Validations from './validations/form';

export default Model.extend(Validations, {
  name:        attr('string'),
  formType:    attr('string'),
  title:       attr('string'),
  description: attr('string'),

  elements: hasMany('form-element'),
  company:  belongsTo('company'),
  creator:  belongsTo('employee'),

  target:     resolveForTypeKey('target'),
  targetId:   attr('string-or-null'),
  targetType: attr('string-or-null'),

  created: attr('date', { defaultValue: () => new Date() })
});
