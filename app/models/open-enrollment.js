import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default class OpenEnrollment extends Model {
  @belongsTo('company') company

  @attr('number') month

  @attr('number') day

  @attr('date', { defaultValue: () => new Date() }) created;
}
