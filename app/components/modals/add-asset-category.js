import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Modal from '.';
import $ from 'jquery';

export default Modal.extend({
  store: service(),
  icons: 'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w(),

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  sharableLabel: computed('newAsset.name', function () {
    return this.get('newAsset.name') ? htmlSafe(`Can ${this.get('newAsset.name')} be shared by employees`) : htmlSafe('Can these assets be shared by employees');
  }),

  createConfirm () {
    const store = this.get('store');

    this.setProperties({ newAsset: store.createRecord('asset', {}) });
    this.dispatchSemanticModal();

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  },

  startAddingAsset: computed('modalId', function () {
    return this.createConfirm.bind(this);
  }),

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  actions: {
    save () {
      this.get('newAsset').save().then(asset => {
        this.setProperties({ newAsset: null });
        this.closeModal();
        this.get('newAssetCategory')(asset);
      });
    },

    cancel () {
      this.get('newAsset').destroyRecord();
      this.closeModal();
    }
  }
});
