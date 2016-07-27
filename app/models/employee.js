import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  firstName:  attr('string'),
  middleName: attr('string'),
  lastName:   attr('string'),
  suffixName: attr('string'),

  ssn:      attr('string'),
  phone:    attr('string'),
  email:    attr('string'),

  dateOfBirth: attr('date'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
