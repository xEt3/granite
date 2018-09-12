import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(pagination, del, {
  application:      controller(),
  addingDepartment: computed.equal('application.currentPath', 'account.anatomy.departments.index.new'),
  queryParams:      [ 'page' ],
  limit:            20,

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
