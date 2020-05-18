import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class CorrectiveActionFollowup extends Model {
  @attr('string') notes;

  @attr('boolean') didResolve;

  @attr('date') nextFollowup;

  @belongsTo('employee') creator;

  @attr('date', { defaultValue: () => new Date() }) created;
}
