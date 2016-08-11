import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

export default Model.extend({
  firstName:  attr('string'),
  middleName: attr('string'),
  lastName:   attr('string'),

  email:    attr('string'),
  password: attr('string'),

  company: belongsTo('company', { async: true, inverse: false }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  }),

  fullName: computed('firstName', 'lastName', 'middleInitial', 'suffix', function () {
    var n = this.getProperties('firstName', 'lastName', 'middleName', 'suffixName'),
        fullName = '';

    fullName += n.firstName || '';
    fullName += n.middleName ? ' ' + n.middleName : '';
    fullName += n.lastName ? ' ' + n.lastName : '';
    fullName += n.suffixName ? ' ' + n.suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  })
});