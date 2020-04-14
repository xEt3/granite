import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { formalActionSuggestions } from 'granite/config/suggestions';
import { Promise } from 'rsvp';

@classic
export default class CorrectiveAction extends Model {
  @attr('string')
  type;

  @attr('string')
  descriptionIssues;

  @attr('string')
  descriptionExpectations;

  @attr('string', { defaultValue: formalActionSuggestions.consequences })
  descriptionConsequences;

  @belongsTo('company')
  company;

  @belongsTo('employee', {
    async:   true,
    inverse: null
  })
  creator;

  @belongsTo('employee')
  employee;

  @belongsTo('employee-issue')
  employeeIssue;

  @hasMany('employee')
  excludedEmployees;

  @hasMany('corrective-action-followup')
  followUps;

  @attr('string')
  severity;

  @attr('string')
  notes;

  @attr('string')
  followUpNotes;

  @attr('boolean')
  didResolve;

  @attr('date')
  followUpOn;

  @attr('date')
  resolutionStatusOn;

  @hasMany('file')
  documents;

  @attr('date', { defaultValue: () => new Date() })
  issuedOn;

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
}
