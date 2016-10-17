import Model from 'ember-data/model';
import DS from 'ember-data';
import resolveForTypeKey from '../utils/resolve-for-type-key';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, hasMany, belongsTo } = DS;
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
  priority:    attr('number'),
  created:     attr('date'),

// Relational
  participants:  hasMany('employee', { async: true }),
  subscribers:   hasMany('employee', { async: true }),
  comments:      hasMany('comment', { inverse: false}),
  notifications: hasMany('notification', { async: true }),
  prerequisites: hasMany('prerequisite', { async: true }),
  tags:          hasMany('tag', { async: true }),
  attachments:   hasMany('document', { async: true }),
  milestones:    hasMany('milestone', { async: true }),
  checklist:     hasMany('checklistItem', { inverse: false}),
  company:       belongsTo('company'),
  owner:         belongsTo('employee'),

  target:     resolveForTypeKey('target'),
  targetId:   attr('string-or-null'),
  targetType: attr('string-or-null'),

  // Comments, non-inverse

  completedOn:  Date,
  cancelledOn:  Date,
  dueOn:        Date,
  delayedUntil: Date,
  remindOn:     Date
});
