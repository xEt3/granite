import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';

export default Model.extend({
  description:     attr('string'),
  descriptionHtml: attr('string'),
  context:         attr('string'),
  action:          attr('string'),
  icon:            attr('string'),
  tag:             attr('string'),

  actorId:    attr('string-or-null'),
  actorType:  attr('string-or-null'),
  targetId:   attr('string-or-null'),
  targetType: attr('string-or-null'),

  company:  belongsTo('company'),
  comments: hasMany('comment', { inverse: false }),
  likes:    hasMany('like', { inverse: false }),

  created: attr('date', {
    defaultValue: () => new Date()
  }),

  actor: resolveForTypeKey('actor'),
  target: resolveForTypeKey('target')
});
