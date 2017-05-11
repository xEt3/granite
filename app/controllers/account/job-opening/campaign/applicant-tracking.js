import Ember from 'ember';

const {
  Controller,
  A,
  RSVP: { Promise },
  computed,
  get
} = Ember;

export default Controller.extend({
  selectedApplications: A(),
  confirmInjectModalId: 'modal__ats-confirm-inject',

  pendingApplications: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

  activeCandidates: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

  progressApplications (applications = [], stageNumber = 0) {
    this.ajaxStart();

    return this.getStage(stageNumber)
    .then(stage => {

      return Promise.reduce(applications, (successful, application) => {
        application.setProperties({
          stage,
          candidate: true,
          reviewedOn: new Date()
        });
      }, []);
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

      const promise = new Promise((resolve, reject) => this.set('injectPromise', { resolve, reject }));

      promise
      .then(() => this.progressApplications(applications, 0))
      .then(() => {
        this.send('deselectAllApplications');
      })
      .catch(() => {}); // Noop
    },

    confirmInjectResponse (response) {
      const promise = this.get('injectPromise');
      this.set('injectResponded', true);
      promise[response ? 'resolve' : 'reject']();
    }
  }
});
