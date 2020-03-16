import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import { inject as service } from '@ember/service';

export default Controller.extend(del, {
  ajax:                service(),
  application:         controller(),
  transitionAfterSave: 'account.employees',
  icons:               {
    equipment:  'mobile',
    changes:    'history',
    documents:  'file',
    counseling: 'folder open',
    education:  'graduation cap'
  },

  onSummary:   computed.equal('application.currentPath', 'account.employee.index.index'),
  currentPath: computed.reads('application.currentPath'),

  subRoute: computed('target.currentURL', function () {
    let path = this.target.currentURL.split('/');
    let currentMenu = path[path.length - 1];
    return currentMenu === 'history' ? 'changes' : currentMenu;
  }),

  subMenuClass: computed('subRoute', function () {
    return this.icons[this.get('subRoute')];
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
