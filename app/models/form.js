import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import Validations from './validations/form';

@classic
export default class Form extends Model.extend(Validations) {
  @attr('string')
  name;

  @attr('string')
  formType;

  @attr('string')
  title;

  @attr('string')
  description;

  @hasMany('form-element')
  elements;

  @belongsTo('company')
  company;

  @belongsTo('employee')
  creator;

  @resolveForTypeKey('target')
  target;

  @attr('string-or-null')
  targetId;

  @attr('string-or-null')
  targetType;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
