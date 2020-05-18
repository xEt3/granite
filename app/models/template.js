import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class Template extends Model {
  @attr('string') key;

  @attr() content;

  @attr('boolean') isRenderable;

  @belongsTo('company', { inverse: null }) company;

  @belongsTo('employee', { inverse: null }) creator;

  @attr('date', { defaultValue: () => new Date() }) created;
}
