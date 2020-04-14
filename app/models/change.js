import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class Change extends Model {
  @attr('array')
  changes;

  @attr('boolean')
  applied;

  @attr('date')
  reviewedOn;

  @attr('date')
  effectiveOn;

  @belongsTo('employee', {
    async:   true,
    inverse: null
  })
  appliedBy;

  @belongsTo('company', {
    async:   true,
    inverse: null
  })
  company;

  @belongsTo('employee', {
    async:   true,
    inverse: null
  })
  employee;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
