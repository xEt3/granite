import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/job';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class Job extends Model.extend(Validations) {
  @attr('string')
  title;

  @attr('string')
  description;

  @attr('string')
  category;

  @belongsTo('company')
  company;

  @belongsTo('employee')
  creator;

  @belongsTo('department')
  department;

  @hasMany('asset')
  assets;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
