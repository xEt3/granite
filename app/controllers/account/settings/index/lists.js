import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  queryParams:     [ 'list' ],
  listItemModalId: 'settings__add-edit-list-item',
  labelModalId:    'settings__add-edit-label-list',
  list:            null,
  dirtyList:       false,
  currentItem:     null,

  afterSave () {
    if (this.get('list') === 'labels') {
      this.get('model').forEach(item => {
        if (!item.id) {
          item.destroyRecord();
        }
      });
    }
  },

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
      this.setProperties({
        respondedModal: false,
        currentItem:    this.get('list') === 'labels' ? this.get('currentItem') || {} : ''
      });

      let modalId = this.get('list') === 'labels' ? this.get('labelModalId') : this.get('listItemModalId');

      $(`#${modalId}`).modal({
        detachable: true,
        context:    '.ember-application',
        onHidden:   () => {
          this.setProperties({
            currentItem: null,
            editingItem: false,
            index:       null
          });

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
      let modalId = this.get('list') === 'labels' ? this.get('labelModalId') : this.get('listItemModalId');

      $(`#${modalId}`).modal('hide');
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

      if (typeof currentItem === 'object') {
        currentItem = this.store.createRecord('label', {
          text:  currentItem.text,
          color: currentItem.color
        });
      }

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
