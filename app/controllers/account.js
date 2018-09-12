import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import breadcrumbOverrides from '../config/breadcrumb';

export default Controller.extend({
  breadcrumbOverrides,

  auth:        service(),
  application: controller(),
  currentPath: computed.reads('application.currentPath'),

  actions: {
    logout () {
      this.get('auth').logout();
    }
  }
});
