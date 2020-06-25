import classic from 'ember-classic-decorator';
import DS from 'ember-data';
import Model from 'ember-data/model';
const { attr, belongsTo } = DS;

@classic
export default class ChecklistItem extends Model {
  @attr('string') title;

  @attr('date') completedOn;

  @attr('date') assignedOn;

  @attr('number') priority;

  @belongsTo('employee', { async: true }) assignedTo;

  @belongsTo('employee', { async: true }) assignedBy;

  @belongsTo('employee', { async: true }) completedBy;
}
