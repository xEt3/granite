import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { lists } from 'granite/config/forms/lists';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  queryParams: [ 'list' ],
  modalId:     'settings__list-modal',
  list:        null,
  dirtyList:   false,
  currentItem: null,

  currentForm: computed('list', function () {
    return lists[this.get('list')];
  }),

  modelForForm: computed('currentForm.listType', 'currentItem', function () {
    //need this bc you have to pass a model object to quick-form
    return this.get('currentForm.listType') === 'string' ? this : this.get('currentItem');
  }),

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
      this.set('respondedModal', false);

      if (!this.get('currentItem')) {
        //if we aren't editing, set initial currentItem value for modal usage
        this.set('currentItem', this.get('currentForm.listType') === 'string' ? '' : {});
      }

      $(`#${this.get('modalId')}`).modal({
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
      $(`#${this.get('modalId')}`).modal('hide');
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
