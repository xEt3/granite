import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  queryParams: [ 'list' ],
  tempList:    [ 1, 2, 3, 4 ],
  list:        [],
  dirtyList:   false,

  actions: {
    toggleList (list) {
      this.set('list', list);
    },

    async saveList () {
      let company = this.get('company');
      await this.saveModel(company);
      this.set('dirtyList', false);
    },

    addItem (item) {
      console.log('inside addItem');
    },

    openModal (modal) {
      console.log('inside openModal');
      $('#settings__add-edit-list-item').modal('show');
    },

    closeModal () {
      $('#settings__add-edit-list-item').modal('hide');
    },

    deleteItem (item) {
      this.get('model').removeObject(item);
      this.set('dirtyList', true);
    }
  }
});
