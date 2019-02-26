import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(del, pagination, addEdit, {
  queryParams:  [ 'page' ],
  application:  controller(),
  addingAsset:  computed.equal('application.currentPath', 'account.asset.index.new'),
  editAsset:    computed.equal('application.currentPath', 'account.asset.index.edit'),
  popupContent: computed('expandAttributes', function () {
    return this.get('expandAttributes') ? 'Hide all stock attributes' : 'Show all stock attributes';
  }),

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
