import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';
import ajaxStatus from 'granite/mixins/ajax-status';
import modalSupport from 'granite/mixins/modal-support';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const employeeProps = [
  'firstName',
  'middleName',
  'lastName',
  'suffixName',
  'email'
];

export default Controller.extend(addEdit, ajaxStatus, modalSupport, {
  auth:                     service(),
  queryParams:              [ 'showDisqualified' ],
  selectedApplications:     A(),
  confirmInjectModalId:     'modal__ats-confirm-inject',
  confirmDisqualifyModalId: 'modal__ats-confirm-disqualify',
  disqualifyModalId:        'modal__ats-disqualify',
  schedulerModalId:         'modal__ats-scheduler',
  linkSharingModalId:       'modal__ats-link-sharing',
  labelsModalId:            'modal__ats-labels',
  showDisqualified:         false,

  pendingApplications: computed.filter('model.applications', function (app) {
    return !get(app, 'stage') && !get(app, 'reviewedOn');
  }),

  activeCandidates: computed.filter('model.applications', function (app) {
    return !!get(app, 'stage');
  }),

  resetMeeting () {
    if (this.currentMeeting) {
      this.currentMeeting.destroy();
    }

    this.set('currentMeeting', this.store.createRecord('event'));
  },

  progressApplications (applications = []) {
    this.ajaxStart();
    const stages = this.get('model.pipeline.stages') || [];

    return RSVP.map(applications, (application) => {
      const appStage = application.get('stage'),
            stage = appStage ? stages.indexOf(stages.findBy('_id', appStage)) : stages.get('firstObject._id');

      application.setProperties({
        stage,
        candidate:  true,
        stageOrder: 0,
        reviewedOn: new Date()
      });

      return application.save();
    })
    .then(result => {
      this.ajaxSuccess();
      return result;
    })
    .catch(this.ajaxError.bind(this));
  },

  injectConfirmed (applications) {
    this.progressApplications(applications)
    .then(() => {
      this.send('deselectAllApplications');
      this.send('refresh');
    });
  },

  async saveMeeting (event) {
    this.set('newScheduledMeeting', null);

    this.ajaxStart();

    const app = this.appInScheduler,
          isEmployeeApplicant = app.get('isEmployee');

    event.setProperties({
      contextId:     app.get('id'),
      contextType:   'JobApplication',
      attendantId:   get(isEmployeeApplicant ? app.get('employee') : app.get('applicant'), 'id'),
      attendantType: isEmployeeApplicant ? 'Employee' : 'Applicant'
    });
    try {
      let meeting = await event.save();

      const title = meeting.get('title') ? `"${meeting.get('title')}"` : 'meeting',
            start = moment(meeting.get('start'));

      this.analytics.trackEvent('Features', 'ats_meeting', 'Created ATS meeting');

      this.ajaxSuccess(`Scheduled ${title} at ${start.format('h:mma [on] M/D/YY')}`);

      this.set('newScheduledMeeting', app.get('id'));
    } catch (e) {
      this.ajaxError(e);
    }
  },

  async beginOnboarding (jobApplication) {
    this.analytics.trackEvent('Recruiting', 'hire', 'Hired candidate');

    const job = this.get('model.job'),
          jobOpening = this.get('model.jobOpening'),
          applicant  = await jobApplication.get('applicant');

    let employee = await jobApplication.get('employee');

    jobApplication.setProperties({
      hired:      true,
      hiredSetOn: new Date(),
      hiredSetBy: this.get('auth.user.employee')
    });

    // Check for existing employee record,
    // if nothing exists, create one
    if (!jobApplication.get('isEmployee') && applicant) {
      let employeeData = Object.assign({}, applicant.getProperties(employeeProps), { onboarding: true });
      employee = this.store.createRecord('employee', employeeData);
    }

    let wasNew = employee.get('isNew');

    employee.setProperties({
      jobTitle:        job.get('title'),
      jobDescription:  job,
      eeoJobCategory:  jobOpening.get('eeoCategory'),
      hiredFromJobApp: jobApplication
    });

    try {
      await jobApplication.save();
      await employee.save();

      if (wasNew) {
        this.transitionToRoute('account.employee.onboard', employee.get('id'));
      }
    } catch (e) {
      this.ajaxError(e);
    }
  },

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    },

    selectApplication (app, remove) {
      this.selectedApplications[remove ? 'removeObject' : 'addObject'](app);
    },

    selectAllApplications () {
      this.set('selectedApplications', A([ ...this.pendingApplications.toArray() ]));
    },

    deselectAllApplications () {
      this.set('selectedApplications', A());
    },

    disqualifyCandidate (jobApp) {
      if (!jobApp) {
        return;
      }

      this.analytics.trackEvent('Recruiting', 'candidate_disqualified', 'Disqualified candidate');

      const jobApps = get(jobApp, 'length') && jobApp.toArray ? jobApp.toArray() : [ jobApp ];

      this.ajaxStart();

      RSVP.map(jobApps, app => {
        app.set('disqualified', true);
        return app.save();
      })
      .then(() => {
        this.ajaxSuccess();
        this.set('appInDisqualifyConfirm', null);
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    },

    unDisqualifyCandidate (jobApp) {
      this.analytics.trackEvent('Recruiting', 'candidate_requalified', 'Requalified candidate');

      jobApp.setProperties({
        disqualificationReason: null,
        disqualified:           false
      });
      this.saveModel(jobApp);
    },

    unSetHire () {
      // noop for now
      return;
    },

    async saveApplicationLabels () {
      this.analytics.trackEvent('Features', 'ats_labels', 'ATS candidate labeling');
      this.saveModel(await this.appInAddLabels);
    },

    onNotify (type, msg) {
      this.send('notify', type, msg);
    },

    refreshModel () {
      this.send('refresh');
    }
  }
});
