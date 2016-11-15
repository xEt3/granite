import Ember from 'ember';
import wizard from 'granite/mixins/wizard-base';

const { Controller, A, computed } = Ember;

export default Controller.extend(wizard, {
  onStartRoute: computed.equal('application.currentPath', 'account.employee.offboard.index'),
  steps: A([{
    icon: 'info',
    title: 'Start',
    link: 'index'
  }, {
    icon: 'list',
    title: 'Details',
    link: 'details'
  }, {
    icon: 'options',
    title: 'Options',
    link: 'options'
  }, {
    icon: 'mobile',
    title: 'Assets',
    link: 'assets'
  }, {
    icon: 'cubes',
    title: 'Reorganization',
    link: 'reorganization'
  }]),
  actions: {
    startOffboarding () {
      this.set('model.offboarding', true);
      this.model.save()
      .then(() => this.transitionToRoute('account.employee.offboard.details'));
    }
  }
});
