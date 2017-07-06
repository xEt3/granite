import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const {
  Controller,
  A,
  RSVP,
  computed,
  get
} = Ember;

export default Controller.extend(ajaxStatus, {
  selectedApplications: A(),
  confirmInjectModalId: 'modal__ats-confirm-inject',
  confirmDisqualifyModalId: 'modal__ats-confirm-disqualify',
  schedulerModalId: 'modal__ats-scheduler',

  pendingApplications: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

  activeCandidates: computed.filter('model.applications', function(app) {
    return !!get(app, 'stage') && get(app, 'disqualified') !== true;
  }),

  initDisqualifyConfirm (candidate) {
    this.set('appInDisqualifyConfirm', candidate);
    return candidate;
  },

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

    event.save()
    .then(meeting => {
      const title = meeting.get('title') ? `"${meeting.get('title')}"` : 'meeting',
            start = moment(meeting.get('start'));

      this.ajaxSuccess(`Scheduled ${title} at ${start.format('h:mma [on] M/D/YY')}`);
    });
  },

  openModal (id, key) {
    Ember.$(`#${id}`)
    .modal({
      detachable: true,
      onHidden: () => {
        if ( !this.get(`${key}Responded`) ) {
          this.get(`${key}Promise.reject`)();
        }
      }
    })
    .modal('show');

    return new RSVP.Promise((resolve, reject) => this.set(`${key}Promise`, { resolve, reject }));
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

    modalResponse (prefix, response) {
      const promise = this.get(`${prefix}Promise`);

      this.set(`${prefix}Responded`, true);
      promise[response ? 'resolve' : 'reject'](response);
    },

    disqualifyCandidate (jobApp) {
      jobApp.set('disqualified', true);
      this.ajaxStart();
      jobApp.save()
      .then(() => {
        this.ajaxSuccess();
        this.set('appInDisqualifyConfirm', null);
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
