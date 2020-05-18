import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class Like extends Model {
  @belongsTo('company-user', { inverse: false }) liker;

  @attr('date', { defaultValue: () => new Date() }) created;
}
