import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class Message extends Model {
  @attr('string')
  content;

  @hasMany('employee')
  from;

  @belongsTo('file')
  file;

  @belongsTo('messageThread')
  messageThread;

  @belongsTo('company')
  company;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
