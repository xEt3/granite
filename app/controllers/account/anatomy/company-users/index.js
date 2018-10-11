import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(pagination, del, {
  application: controller(),
  addingUser:  computed.equal('application.currentPath', 'account.anatomy.departments.index.new'),
  queryParams: [ 'page' ],
  limit:       10,

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
