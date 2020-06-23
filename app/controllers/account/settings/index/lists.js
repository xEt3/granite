import Controller from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { lists } from 'granite/config/forms/lists';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default class ListsController extends Controller {
  @service data
  queryParams = [ 'list' ];
  modalId = 'settings__list-modal';

  @tracked dirtyList = false;
  @tracked list;
  @tracked currentItem;
  @tracked index
  @tracked editingItem

  get currentForm () {
    return lists[this.list];
  }

  get modelForForm () {
    //need this bc you have to pass a model object to quick-form
    return (this.currentForm || {}).listType === 'string' ? this : this.currentItem;
  }

  @action
  afterSave () {
    if (this.list === 'labels') {
      this.model.forEach(item => {
        if (!item.id) {
          item.destroyRecord();
        }
      });
    }
  }

  @action
  async saveList () {
    await this.data.saveRecord(this.company);
    this.dirtyList = false;
    this.afterSave();
  }

  @action
  toggleList (list) {
    this.list = list;
  }

  @action
  openModal () {
    this.respondedModal = false;

    if (!this.currentItem) {
      //if we aren't editing, set initial currentItem value for modal usage
      this.currentItem = this.currentForm.listType === 'string' ? '' : {};
    }

    $(`#${this.modalId}`).modal({
      detachable: true,
      context:    '.ember-application',
      onHidden:   () => {
        this.currentItem = null;
        this.editingItem = false;
        this.index = null;

        if (!this.respondedModal) {
          this.respondModal(false);
        }
      }
    }).modal('show');

    return new Promise((resolveM, rejectM) => this.setProperties({
      resolveM,
      rejectM
    }));
  }

  @action
  closeModal () {
    $(`#${this.modalId}`).modal('hide');
  }

  @action
  respondModal (response) {
    this[response ? 'resolveM' : 'rejectM'](response ? true : null);
    this.respondedModal = true;
    this.closeModal();
  }

  @action
  beginEdit (item, index) {
    this.index = index;
    this.currentItem = item;
    this.editingItem = true;
  }

  @action
  async addItem () {
    let currentItem = this.currentItem;

    if (typeof currentItem === 'object') {
      currentItem = await this.store.createRecord('label', {
        text:  currentItem.text,
        color: currentItem.color
      });
    }

    this.model.addObject(currentItem);
    this.dirtyList = true;
  }

  @action
  editItem () {
    let currentItem = this.currentItem,
        index = this.index;

    this.model.removeAt(index);
    this.model.insertAt(index, currentItem);
    this.dirtyList = true;
  }

  @action
  deleteItem (item) {
    this.model.removeObject(item);
    this.dirtyList = true;
  }
}
