import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default Model.extend({
  firstName:  attr('string'),
  middleName: attr('string'),
  lastName:   attr('string'),

  email:    attr('string'),
  password: attr('string'),

  shownHints: attr('array'),

  company: belongsTo('company', { async: true, inverse: false }),
  employee: belongsTo('employee', { async: true, inverse: 'companyUser' }),
  permissions: attr('array'),

  activatedOn: attr('date'),

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
