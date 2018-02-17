import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import humanizeKeyName from '../utils/humanize-key-name';

export default Model.extend({
  diff:     attr('array'),
  snapshot: attr(),
  applied:  attr('boolean'),
  approved: attr('boolean'),

  creatorType: attr('string'),
  creatorId:   attr('string'),
  targetType:  attr('string'),
  targetId:    attr('string'),
  company:     belongsTo('company', { async: true, inverse: false }),

  reviewedOn:  attr('date'),
  effectiveOn: attr('date'),

  created: attr('date', {
    defaultValue: () => new Date()
  }),

  creator: resolveForTypeKey('creator'),
  target: resolveForTypeKey('target'),

  changedKeys: computed('diff.[]', function () {
    let diff = this.get('diff');
    return diff ? diff.reduce((arr, i) => {
      arr.push(humanizeKeyName(i.path.join('.')));
      return arr;
    }, []) : null;
  })
});
