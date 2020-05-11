import Controller from 'granite/core/controller';
import { computed, get, action } from '@ember/object';
import { modalSupport } from 'granite/core';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';

const employeeProps = [
  'firstName',
  'middleName',
  'lastName',
  'suffixName',
  'email'
];

@modalSupport
export default class AccountJobOpeningCampaignApplicantTrackingController extends Controller {
  @service auth
  @service data

  @tracked selectedApplications = A()
  @tracked appInDisqualifyConfirm = {}
  @tracked appInLinkSharing = {}
  @tracked appInAddLabels = {}
  @tracked currentMeeting = {}

  queryParams =              [ 'showDisqualified' ]
  confirmInjectModalId =     'modal__ats-confirm-inject'
  confirmDisqualifyModalId = 'modal__ats-confirm-disqualify'
  disqualifyModalId =        'modal__ats-disqualify'
  schedulerModalId =         'modal__ats-scheduler'
  linkSharingModalId =       'modal__ats-link-sharing'
  labelsModalId =            'modal__ats-labels'
  showDisqualified =         false

  @computed.filter('model.applications', function (app) {
    return !get(app, 'stage') && !get(app, 'reviewedOn');
  }) pendingApplications

  @computed.filter('model.applications', function (app) {
    return !!get(app, 'stage');
  }) activeCandidates

  @action
  resetMeeting () {
    if (Object.keys(this.currentMeeting).length > 0) {
      this.currentMeeting.destroy();
    }

    this.currentMeeting = this.store.createRecord('event');
  }

  @action
  async progressApplications (applications = []) {
    let { success, error } = this.data.createStatus();
    const stages = this.model.pipeline.stages || [];

    try {
      await RSVP.all(applications.map(async (application) => {
        const appStage = application.stage,
              stage = appStage ? stages.indexOf(stages.findBy('_id', appStage)) : stages.firstObject._id;

        application.setProperties({
          stage,
          candidate:  true,
          stageOrder: 0,
          reviewedOn: new Date()
        });

        return await application.save();
      }));
      success();
    } catch (e) {
      error(e);
    }
  }

  @action
  async injectConfirmed (applications) {
    await this.progressApplications(applications);
    this.deselectAllApplications();
    this.send('refreshModel');
  }

  @action
  async saveMeeting (event) {
    this.newScheduledMeeting = null;

    let { success, error } = this.data.createStatus();

    const app = this.appInScheduler,
          isEmployeeApplicant = app.isEmployee;

    event.setProperties({
      contextId:     app.id,
      contextType:   'JobApplication',
      attendantId:   get(isEmployeeApplicant ? app.employee : app.applicant, 'id'),
      attendantType: isEmployeeApplicant ? 'Employee' : 'Applicant'
    });

    try {
      let meeting = await event.save();

      const title = meeting.title ? `"${meeting.title}"` : 'meeting',
            start = moment(meeting.start);

      this.analytics.trackEvent('Features', 'ats_meeting', 'Created ATS meeting');

      success(`Scheduled ${title} at ${start.format('h:mma [on] M/D/YY')}`);

      this.newScheduledMeeting = app.id;
    } catch (e) {
      error(e);
    }
  }

  @action
  async beginOnboarding (jobApplication) {
    this.analytics.trackEvent('Recruiting', 'hire', 'Hired candidate');

    const job = this.model.job,
          jobOpening = this.model.jobOpening,
          applicant  = await jobApplication.applicant;

    let employee = await jobApplication.employee;

    jobApplication.setProperties({
      hired:      true,
      hiredSetOn: new Date(),
      hiredSetBy: this.auth.get('user.employee')
    });

    // Check for existing employee record,
    // if nothing exists, create one
    if (!jobApplication.isEmployee && applicant) {
      let employeeData = Object.assign({}, applicant.getProperties(employeeProps), { onboarding: true });
      employee = await this.store.createRecord('employee', employeeData);
    }

    let wasNew = employee.isNew;

    employee.setProperties({
      jobTitle:        job.get('title'),
      jobDescription:  job,
      eeoJobCategory:  jobOpening.eeoCategory,
      hiredFromJobApp: jobApplication
    });

    let { success, error } = this.data.createStatus();

    try {
      await jobApplication.save();
      await employee.save();

      if (wasNew) {
        this.transitionToRoute('account.employee.onboard', employee.id);
      }

      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  selectApplication (app, remove) {
    this.selectedApplications[remove ? 'removeObject' : 'addObject'](app);
  }

  @action
  selectAllApplications () {
    this.selectedApplications = A([ ...this.pendingApplications.toArray() ]);
  }

  @action
  deselectAllApplications () {
    this.selectedApplications = A();
  }

  @action
  async disqualifyCandidate (jobApp) {
    if (!jobApp) {
      return;
    }

    this.analytics.trackEvent('Recruiting', 'candidate_disqualified', 'Disqualified candidate');

    const jobApps = get(jobApp, 'length') && jobApp.toArray ? jobApp.toArray() : [ jobApp ];

    let { success, error } = this.data.createStatus();

    try {
      await RSVP.all(jobApps.map(async app => {
        app.disqualified = true;
        return await app.save();
      }));

      success();
      this.appInDisqualifyConfirm = {};
      this.send('refreshModel');
    } catch (e) {
      error(e);
    }
  }

  @action
  unDisqualifyCandidate (jobApp) {
    this.analytics.trackEvent('Recruiting', 'candidate_requalified', 'Requalified candidate');

    jobApp.setProperties({
      disqualificationReason: null,
      disqualified:           false
    });
    this.data.saveRecord(jobApp);
  }

  @action
  unSetHire () {
    // noop for now
    return;
  }

  @action
  async saveApplicationLabels () {
    this.analytics.trackEvent('Features', 'ats_labels', 'ATS candidate labeling');
    this.data.saveRecord(await this.appInAddLabels);
  }
}
