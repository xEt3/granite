import Model from 'ember-data/model';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, hasMany } = DS;
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
  checklist:   attr('string'),
  priority:    attr('number'),
  created:     attr('date'),

// Relational
  team:          hasMany('user', { async: true }),
  comments:      hasMany('comment', { async: true}),
  notifications: hasMany('notification', { async: true }),
  prerequisites: hasMany('prerequisite', { async: true }),
  tags:          hasMany('tag', { async: true }),
  attachments:   hasMany('doucment', { async: true }),
  milestones:    hasMany('milestone', { async: true })
});
