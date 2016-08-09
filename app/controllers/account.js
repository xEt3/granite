import Ember from 'ember';
import breadcrumbOverrides from '../config/breadcrumb';

const { Controller, inject, computed } = Ember;

export default Controller.extend({
  breadcrumbOverrides,

  auth: inject.service(),
  application: inject.controller(),
  currentPath: computed.reads('application.currentPath'),

  actions: {
    logout () {
      this.get('auth').logout();
    }
  }
});
