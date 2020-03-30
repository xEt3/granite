import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import { inject as service } from '@ember/service';

export default Controller.extend(del, {
  ajax:                service(),
  router:              service(),
  application:         controller(),
  transitionAfterSave: 'account.employees',
  subRoutes:           computed('auth.user.company.exposeBetaModules', function () {
    return [{
      route: 'account.employee.index.equipment',
      name:  'Equipment',
      icon:  'mobile'
    }, {
      route: 'account.employee.index.documents',
      name:  'Documents',
      icon:  'file'
    }, {
      route: 'account.employee.index.history',
      name:  'Changes',
      icon:  'history'
    }, {
      route: 'account.employee.index.counseling',
      name:  'Counseling',
      icon:  'folder open'
    }, this.get('auth.user.company.exposeBetaModules') && {
      route: 'account.employee.index.education',
      name:  'Education & Training',
      icon:  'graduation cap'
    } ].filter(Boolean);
  }),

  onSummary: computed.equal('router.currentRouteName', 'account.employee.index.index'),

  subRoute: computed('router.currentRouteName', function () {
    return this.subRoutes.find(({ route }) => this.get('router.currentRouteName').indexOf(route.split('.').pop()) > -1);
  }),

  actions: {
    resend () {
      this.ajaxStart();

      return this.get('ajax').request(`/api/v1/employee/${this.model.id}/resend-activation`)
      .then(() => {
        this.ajaxSuccess('Email sent.');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
