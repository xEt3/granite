import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';
import modalSupport from 'granite/mixins/modal-support';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
const {
  Controller,
  A,
  RSVP,
  computed,
  get,
  inject: { service }
} = Ember;

const employeeProps = [
  'firstName',
  'middleName',
  'lastName',
  'suffixName',
  'email'
];

export default Controller.extend(addEdit, ajaxStatus, modalSupport, {
  auth: service(),
  queryParams: [ 'showDisqualified' ],
  selectedApplications: A(),
  confirmInjectModalId: 'modal__ats-confirm-inject',
  confirmDisqualifyModalId: 'modal__ats-confirm-disqualify',
  schedulerModalId: 'modal__ats-scheduler',
  showDisqualified: false,

  pendingApplications: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn') && !get(app, 'disqualified');
  }),

  activeCandidates: computed.filter('model.applications', function(app) {
    return !!get(app, 'stage');
  }),

  resetMeeting () {
    if (this.get('currentMeeting')) {
      this.get('currentMeeting').destroy();
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
        candidate: true,
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

  saveMeeting (event) {
    this.ajaxStart();

    const app = this.get('appInScheduler'),
          isEmployeeApplicant = app.get('isEmployee');

    event.setProperties({
      contextId: app.get('id'),
      contextType: 'JobApplication',
      attendantId: get(isEmployeeApplicant ? app.get('employee') : app.get('applicant'), 'id'),
      attendantType: isEmployeeApplicant ? 'Employee' : 'Applicant'
    });

    event.save()
    .then(meeting => {
      const title = meeting.get('title') ? `"${meeting.get('title')}"` : 'meeting',
            start = moment(meeting.get('start'));

      this.ajaxSuccess(`Scheduled ${title} at ${start.format('h:mma [on] M/D/YY')}`);
    });
  },

  beginOnboarding (jobApplication) {
    const job = this.get('model.job'),
          applicant = jobApplication.get('applicant');

    let employee = jobApplication.get('employee');

    jobApplication.setProperties({
      hired: true,
      hiredSetOn: new Date(),
      hiredSetBy: this.get('auth.user.employee')
    });

    // Check for existing employee record,
    // if nothing exists, create one
    if (!jobApplication.get('isEmployee') && applicant) {
      let employeeData = Object.assign({}, applicant.getProperties(employeeProps), {
        onboarding: true
      });
      employee = this.get('store').createRecord('employee', employeeData);
    }

    let wasNew = employee.get('isNew');

    employee.set('jobTitle', job.get('title'));

    return jobApplication.save()
    .then(() => employee.get('content').save())
    .then(employeeRecord => {
      if (wasNew) {
        this.transitionToRoute('account.employee.onboard', employeeRecord.get('id'));
      }
    })
    .catch(this.ajaxError.bind(this));
  },

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    },

    selectApplication (app, remove) {
      this.get('selectedApplications')[remove ? 'removeObject' : 'addObject'](app);
    },

    selectAllApplications () {
      this.set('selectedApplications', A([ ...this.get('pendingApplications').toArray() ]));
    },

    deselectAllApplications () {
      this.set('selectedApplications', A());
    },

    disqualifyCandidate (jobApp) {
      if (!jobApp) {
        return;
      }

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
      jobApp.set('disqualified', false);
      this.saveModel(jobApp);
    },

    unSetHire () {
      // noop for now
      return;
    }
  }
});
