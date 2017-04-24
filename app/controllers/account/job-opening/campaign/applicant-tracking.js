import Ember from 'ember';

const { Controller, A, computed, get } = Ember;

export default Controller.extend({
  selectedApplications: A(),

  pendingApplications: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

  activeCandidates: computed.filter('model.applications', function(app) {
    return !get(app, 'reviewedOn');
  }),

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
    }
  }
});
