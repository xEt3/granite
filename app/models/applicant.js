import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  fullName: computed('firstName', 'lastName', 'middleInitial', 'suffix', function () {
    var n = this.getProperties('firstName', 'lastName', 'middleName', 'suffixName'),
        fullName = '';

    fullName += n.firstName || '';
    fullName += n.middleName ? ' ' + n.middleName : '';
    fullName += n.lastName ? ' ' + n.lastName : '';
    fullName += n.suffixName ? ' ' + n.suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  }),

  firstName:  attr('string'),
  middleName: attr('string'),
  lastName:   attr('string'),
  suffixName: attr('string'),

  email: attr('string'),

  created: {
    type: Date,
    default: Date.now,
    index: true
  }
});
