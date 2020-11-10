import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default class TaskStatus extends Model {
  @attr('string') status
  @attr('string') name
  @attr('string') description
  @attr() result
  @attr('string') error
  @attr('boolean') running
  @attr() context
  @belongsTo('company', {
    inverse: null,
    async:   true
  })
  company
  @attr('date') updated
  @attr('date') created

  get taskPending () {
    return this.running ? true : this.status === 'Created';
  }
}
