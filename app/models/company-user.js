import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class CompanyUser extends Model {
  @attr('string')
  firstName;

  @attr('string')
  middleName;

  @attr('string')
  lastName;

  @attr('string')
  email;

  @attr('string')
  password;

  @attr('boolean')
  inactive;

  @attr('array')
  shownHints;

  @belongsTo('company', {
    async:   true,
    inverse: false
  })
  company;

  @belongsTo('employee', {
    async:   true,
    inverse: 'companyUser'
  })
  employee;

  @attr('array')
  permissions;

  @attr('date')
  activatedOn;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;

  @computed('firstName', 'lastName', 'middleInitial', 'suffix')
  get fullName() {
    var n = this.getProperties('firstName', 'lastName', 'middleName', 'suffixName'),
        fullName = '';

    fullName += n.firstName || '';
    fullName += n.middleName ? ' ' + n.middleName : '';
    fullName += n.lastName ? ' ' + n.lastName : '';
    fullName += n.suffixName ? ' ' + n.suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  }
}
