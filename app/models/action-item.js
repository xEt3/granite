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

// Relational
  participants:  hasMany('employee', { async: true }),
  subscribers:   hasMany('employee', { async: true }),
  comments:      hasMany('comment', { async: true, inverse: false }),
  prerequisites: hasMany('action-item', { async: true }),
  // attachments:   hasMany('document', { async: true }),
  checklist:     hasMany('checklist-item', { inverse: false }),
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
  })
});
