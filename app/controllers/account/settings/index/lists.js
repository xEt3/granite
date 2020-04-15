import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { lists } from 'granite/config/forms/lists';
import $ from 'jquery';

@classic
export default class ListsController extends Controller.extend(addEdit) {
  queryParams = [ 'list' ];
  modalId = 'settings__list-modal';
  @tracked list = null;
  dirtyList = false;
  @tracked currentItem = null;

  get currentForm() {
    return lists[this.list];
  }

  @computed('currentForm.listType', 'currentItem')
  get modelForForm() {
    //need this bc you have to pass a model object to quick-form
    return this.get('currentForm.listType') === 'string' ? this : this.currentItem;
  }

  afterSave() {
    if (this.list === 'labels') {
      this.model.forEach(item => {
        if (!item.id) {
          item.destroyRecord();
        }
      });
    }
  }

  @action
  async saveList() {
    let company = this.company;
    await this.saveModel(company);
    this.set('dirtyList', false);
  }

  @action
  toggleList(list) {
    this.set('list', list);
  }

  @action
  openModal() {
    this.set('respondedModal', false);

    if (!this.currentItem) {
      //if we aren't editing, set initial currentItem value for modal usage
      this.set('currentItem', this.get('currentForm.listType') === 'string' ? '' : {});
    }

    $(`#${this.modalId}`).modal({
      detachable: true,
      context:    '.ember-application',
      onHidden:   () => {
        this.setProperties({
          currentItem: null,
          editingItem: false,
          index:       null
        });

        if (!this.respondedModal) {
          this.send('respondModal', false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @action
  closeModal() {
    $(`#${this.modalId}`).modal('hide');
  }

  @action
  respondModal(response) {
    this.get(response ? 'resolve' : 'reject')(response);
    this.set('respondedModal', true);
    this.send('closeModal');
  }

  @action
  beginEdit(item, index) {
    this.setProperties({
      index,
      currentItem: item,
      editingItem: true
    });
  }

  @action
  addItem() {
    let currentItem = this.currentItem;

    if (typeof currentItem === 'object') {
      currentItem = this.store.createRecord('label', {
        text:  currentItem.text,
        color: currentItem.color
      });
    }

    this.model.addObject(currentItem);
    this.set('dirtyList', true);
  }

  @action
  editItem() {
    let currentItem = this.currentItem,
        index = this.index;

    this.model.removeAt(index);
    this.model.insertAt(index, currentItem);
    this.set('dirtyList', true);
  }

  @action
  deleteItem(item) {
    this.model.removeObject(item);
    this.set('dirtyList', true);
  }
}
