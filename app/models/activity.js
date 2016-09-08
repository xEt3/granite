import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

const parsedName = s => {
  return s.replace(/([A-Z])/g, function($1, p1, pos) {
    return (pos > 0 ? '-' : '') + $1.toLowerCase();
  });
};

export default Model.extend({
  description: attr('string'),
  action:  attr('string'),
  icon:    attr('string'),

  actorId: attr('string'),
  actorType: attr('string'),
  targetId: attr('string'),
  targetType: attr('string'),

  company: belongsTo('company'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
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
