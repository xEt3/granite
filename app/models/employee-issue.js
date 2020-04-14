import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { Promise } from 'rsvp';

@classic
export default class EmployeeIssue extends Model {
  @attr('string')
  title;

  @belongsTo('company', { inverse: null })
  company;

  @belongsTo('employee', {
    async:   false,
    inverse: null
  })
  creator;

  @belongsTo('employee', { inverse: null })
  employee;

  @hasMany('company-user', { inverse: null })
  excludedUsers;

  @attr('string')
  severity;

  @attr('date')
  resolvedOn;

  @attr('string')
  type;

  @attr('date', { defaultValue: () => new Date() })
  created;

  @computed('severity', 'company')
  get actionSeverity() {
    let severity = this.get('severity');

    if (severity) {
      return Promise.resolve(this.get('company'))
      .then(c => c.get('correctiveActionSeverities.content').findBy('id', severity));
    }

    return null;
  }

  @computed('id', 'title')
  get slug() {
    return `${this.get('title').replace(/\s|_/g, '-')}_${this.get('id')}`;
  }
}
