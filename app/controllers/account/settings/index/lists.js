import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  queryParams: [ 'list' ],
  list:        null,
  dirtyList:   false,
  currentItem: null,

  actions: {
    async saveList () {
      let company = this.get('company');
      await this.saveModel(company);
      this.set('dirtyList', false);
    },

    toggleList (list) {
      this.set('list', list);
    },

    openModal () {
      this.set('respondedModal', false);

      $('#settings__add-edit-list-item').modal({
        detachable: true,
        context:    '.ember-application',
        onHidden:   () => {
          this.set('currentItem', null);
          if (!this.get('respondedModal')) {
            this.send('respondModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolve, reject) => this.setProperties({
        resolve,
        reject
      }));
    },

    closeModal () {
      $('#settings__add-edit-list-item').modal('hide');
    },

    respondModal (response) {
      this.get(response ? 'resolve' : 'reject')(response);
      this.set('respondedModal', true);
      this.send('closeModal');
    },

    beginEdit (item, index) {
      this.setProperties({
        index,
        currentItem: item,
        editingItem: true
      });
    },

    addItem () {
      let currentItem = this.get('currentItem');

      this.get('model').addObject(currentItem);
      this.set('dirtyList', true);
    },

    editItem () {
      let currentItem = this.get('currentItem'),
          index = this.get('index');

      this.get('model').removeAt(index);
      this.get('model').insertAt(index, currentItem);
      this.set('dirtyList', true);
    },

    deleteItem (item) {
      this.get('model').removeObject(item);
      this.set('dirtyList', true);
    }
  }
});
