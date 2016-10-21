import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';

export default Model.extend({
  text:       attr('string'),
  commenter:  belongsTo('employee', { async: true, inverse: false }),
  targetId:   attr('string-or-null'),
  targetType: attr('string-or-null'),

  created: attr('date', {
    defaultValue: () => new Date()
  }),

  target: resolveForTypeKey('target')
});
