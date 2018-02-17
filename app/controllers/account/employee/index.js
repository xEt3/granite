import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(del, {
  application: controller(),
  transitionAfterSave: 'account.employees',

  onSummary: computed.equal('application.currentPath', 'account.employee.index.index')
});
