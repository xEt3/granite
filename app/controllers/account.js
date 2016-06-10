import Ember from 'ember';

const { Controller, inject, computed } = Ember;

export default Controller.extend({
  application: inject.controller(),
  currentPath: computed.reads('application.currentPath')
});
