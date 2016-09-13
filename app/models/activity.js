import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;

const parsedName = s => {
  return s.replace(/([A-Z])/g, ($1, p1, pos) => {
    return (pos > 0 ? '-' : '') + $1.toLowerCase();
  });
};

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

  actor: computed('actorType', 'actorId', function () {
    const type = parsedName(this.get('actorType')),
          id = this.get('actorId');

    return type && id ? this.store.find(type, id) : undefined;
  }),

  target: computed('targetType', 'targetId', function () {
    const type = parsedName(this.get('targetType')),
          id = this.get('targetId');

    return type && id ? this.store.find(type, id) : undefined;
  })
});
