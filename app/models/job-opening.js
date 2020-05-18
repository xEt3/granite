import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import moment from 'moment';

export default class JobOpening extends Model {
  @computed('job.title')
  get defaultName () {
    const jobTitle = this.get('job.title');
    return `${jobTitle ? jobTitle + ' ' : ''}Recruiting Campaign`;
  }

  @attr('string', { defaultValue: '' }) name;
  @attr('string', { defaultValue: '' }) title;
  @attr('string') description;
  @attr('boolean') availableInternally;
  @attr('number') internalDuration; // number of days that this job is internally available before posting to outside sources
  @attr('number', { defaultValue: 1 }) positions; // number of positions to fill
  @attr('boolean') sendCloseNotice; // send an email to unrejected talent when job closes
  @attr('boolean') allocateTalentPool; // allocate unrejected, not hired talent to the pool
  @attr('boolean') applicantScoring;
  @attr('boolean') closed;
  @attr('string') jobType;
  @attr('string') eeoCategory;
  @attr('boolean') supervisoryRequirements;
  @attr('boolean', { defaultValue: true }) setup;
  @attr('number') setupStep;
  @attr('number') setupProgress;
  @attr('date') completedSetup;
  @belongsTo('job') job;
  @belongsTo('company') company;
  @belongsTo('employee') creator;
  @belongsTo('location') location;
  @belongsTo('form') screening;
  @hasMany('employee') subscribers;
  @hasMany('applicant-source') applicantSources;
  @hasMany('manual-applicant-source') manualApplicantSources;
  @attr('array') emailSubscribers;
  @attr('date') startOn;
  @attr('date') endOn;
  @attr('date') dueOn;
  @attr('date') completedOn;
  @attr('date', { defaultValue: () => new Date() }) created;

  @computed('completedSetup', 'completedOn', 'startOn', 'endOn')
  get hiring () {
    let now = moment(),
        props = this.getProperties('completedSetup', 'completedOn', 'startOn', 'endOn');

    return !!(props.completedSetup && !props.completedOn && (!props.endOn || now.isBefore(props.endOn)) && (!props.startOn || now.isAfter(props.startOn)));
  }

  @computed('id', 'title')
  get slug () {
    let title = this.title || '';
    return `${title.replace(/[\s]/g, '-')}_${this.id}`;
  }
}
