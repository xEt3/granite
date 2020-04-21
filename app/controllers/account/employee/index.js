import Controller from 'granite/core/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class AccountEmployeeIndexController extends Controller {
  @service ajax
  @service data
  @service router
  @controller application

  afterSaveOptions = { transitionAfterSave: 'account.employees' }

  @computed.equal('router.currentRouteName', 'account.employee.index.index') onSummary

  get subRoutes () {
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
    }, this.auth.get('user.company.exposeBetaModules') && {
      route: 'account.employee.index.education',
      name:  'Education & Training',
      icon:  'graduation cap'
    } ].filter(Boolean);
  }

  get subRoute () {
    return this.subRoutes.find(({ route }) => this.router.currentRouteName.indexOf(route.split('.').pop()) > -1);
  }

  @action
  async resend () {
    let { success, error } = this.data.createStatus('resending');

    try {
      await this.ajax.request(`/api/v1/employee/${this.model.id}/resend-activation`);
      success('Email sent.');
    } catch (e) {
      error(e);
    }
  }
}
