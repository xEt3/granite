import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(pagination, del, {
  application: controller(),
  addingLocation: computed.equal('application.currentPath', 'account.anatomy.locations.index.new'),
  queryParams: [ 'page' ],
  limit: 20,

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
