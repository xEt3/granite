import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, hasMany, belongsTo } = DS;
const { computed } = Ember;
const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ]
});

export default Model.extend(Validations, {
  title:       attr('string'),
  description: attr('string'),
  priority:    attr('number', { defaultValue: 1 }),

  // Relational
  participants:  hasMany('employee', { async: true, inverse: null }),
  subscribers:   hasMany('employee', { async: true, inverse: null }),
  comments:      hasMany('comment', { async: true, inverse: null }),
  prerequisites: hasMany('action-item', { async: true, inverse: null }),
  // attachments:   hasMany('document', { async: true }),
  checklist:     hasMany('checklist-item', { inverse: null }),
  company:       belongsTo('company'),
  owner:         belongsTo('employee'),

  target:     resolveForTypeKey('target'),
  targetId:   attr('string-or-null'),
  targetType: attr('string-or-null'),

  // Comments, non-inverse

  completedOn:  attr('date'),
  cancelledOn:  attr('date'),
  dueOn:        attr('date'),
  delayedUntil: attr('date'),
  remindOn:     attr('date'),
  created:      attr('date', {
    defaultValue: () => new Date()
  }),

  slug: computed('title', function () {
    let title = this.get('title');
    return title ? title.replace(/\s/g, '-') : title;
  }),

  incompleteTodos: computed.filter('checklist', todo => !todo.get('completedOn')),
  completeTodos: computed.filter('checklist', todo => todo.get('completedOn')),

  percentComplete: computed('checklist.[]', 'completeTodos.[]', function () {
    let total = this.get('completeTodos.length') || 0,
        completed = this.get('checklist.length') || 0;

    return total / completed * 100;
  })
});
