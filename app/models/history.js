import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import humanizeKeyName from '../utils/humanize-key-name';

@classic
export default class History extends Model {
  @attr('array')
  diff;

  @attr()
  snapshot;

  @attr('boolean')
  applied;

  @attr('boolean')
  approved;

  @attr('string')
  creatorType;

  @attr('string')
  creatorId;

  @attr('string')
  targetType;

  @attr('string')
  targetId;

  @belongsTo('company', {
    async:   true,
    inverse: false
  })
  company;

  @attr('date')
  reviewedOn;

  @attr('date')
  effectiveOn;

  @attr('date', { defaultValue: () => new Date() })
  created;

  @resolveForTypeKey('creator')
  creator;

  @resolveForTypeKey('target')
  target;

  @computed('diff.[]')
  get changedKeys () {
    let diff = this.diff;
    return diff ? diff.reduce((arr, i) => {
      arr.push(humanizeKeyName(i.path.join('.')));
      return arr;
    }, []) : null;
  }
}
