import Ember from 'ember';

const { Controller, inject, computed } = Ember;

export default Controller.extend({
  auth: inject.service(),
  application: inject.controller(),
  currentPath: computed.reads('application.currentPath'),

  actions: {
    logout () {
      this.get('auth').logout();
    }
  }
});
