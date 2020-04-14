import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class TaskStatus extends Model {
  @attr('string')
  status;

  @attr('string')
  name;

  @attr('string')
  description;

  @attr()
  result;

  @attr('string')
  error;

  @attr('boolean')
  running;

  @attr()
  context;

  @belongsTo('company', {
    inverse: null,
    async:   true
  })
  company;

  updated = Date;

  @attr('date')
  created;
}
