import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class MessageThread extends Model {
  @hasMany('employee')
  between;

  @belongsTo('company')
  company;

  @belongsTo('employee')
  creator;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
