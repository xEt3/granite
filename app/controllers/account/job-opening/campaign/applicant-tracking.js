import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const {
  Controller,
  Logger: { error },
  A,
  RSVP,
  computed,
  get
} = Ember;

export default Controller.extend(ajaxStatus, {
  selectedApplications: A(),
  confirmInjectModalId: 'modal__ats-confirm-inject',

  pendingApplications: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

  activeCandidates: computed.filter('model.applications', function(app) {
    return !!get(app, 'stage');
  }),

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

    moveSelectedToPipeline () {
      const applications = this.get('selectedApplications'),
            modalId = this.get('confirmInjectModalId');

      Ember.$(`#${modalId}`)
      .modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('injectResponded') ) {
            this.get('injectPromise.reject')();
          }
        }
      })
      .modal('show');

      const promise = new RSVP.Promise((resolve, reject) => this.set('injectPromise', { resolve, reject }));

      promise
      .then(() => this.progressApplications(applications))
      .then(() => {
        this.send('deselectAllApplications');
        this.send('refresh');
      })
      .catch(err => {
        error(err);
      }); // Noop
    },

    confirmInjectResponse (response) {
      const promise = this.get('injectPromise');
      this.set('injectResponded', true);
      promise[response ? 'resolve' : 'reject']();
    }
  }
});
