import Modal from '.';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';

export default class ModalsAddAssetCategoryModal extends Modal {
  @service store
  @tracked newAsset = {};

  elementId = this.elementId = Math.round(Math.random() * Math.pow(10, 10));
  icons =     'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w()

  get modalId () {
    return this.elementId + '-modal';
  }

  get sharableLabel () {
    return this.newAsset && this.newAsset.name ? htmlSafe(`Can ${this.newAsset.name} be shared by employees`) : htmlSafe('Can these assets be shared by employees');
  }

  @action
  async createConfirm () {
    const store = this.store;

    this.newAsset = await store.createRecord('asset', {});
    this.dispatchSemanticModal();

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  @action
  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  async save () {
    let asset = await this.newAsset.save();
    this.newAsset = {};
    this.closeModal();
    this.args.newAssetCategory(asset);
  }

  @action
  cancel () {
    this.newAsset.destroyRecord();
    this.closeModal();
  }
}
