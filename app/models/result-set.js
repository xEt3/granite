import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class ResultSet extends Model {
  @attr()
  deserialized;

  @attr('string')
  serialized;

  @belongsTo('company')
  company;

  @belongsTo('employee')
  creator;

  @attr('date')
  created;
}
