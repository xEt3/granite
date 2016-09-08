import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

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
    const type = this.get('actorType'),
          // TODO ^ type needs to be munged before we use it.
          // Right now it will come in as 'Model' or 'ModelTest' camel casing
          // we need lowercase dasherized to resolve it ('model' or 'model-test')
          id = this.get('actorId');

    return type && id ? this.store.find(type, id) : undefined;
  }),

  target: computed('targetType', 'targetId', function () {
    const type = this.get('targetType'),
          // TODO ^ type needs to be munged before we use it.
          // Right now it will come in as 'Model' or 'ModelTest' camel casing
          // we need lowercase dasherized to resolve it ('model' or 'model-test')
          id = this.get('targetId');

    return type && id ? this.store.find(type, id) : undefined;
  })
});
