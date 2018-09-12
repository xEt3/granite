import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  icons: 'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w(),

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  createConfirm () {
    const store = this.get('store');

    this.setProperties({ newAsset: store.createRecord('asset', {}) });

    $('#' + this.get('modalId')).modal({
      detachable: true,
      closable:   false,
      context:    'body.ember-application'
    }).modal('show');

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
      this.get('newAsset').save().then(() => {
        this.setProperties({ newAsset: null });
        this.closeModal();
        this.get('newAssetCategory')();
      });
    },

    cancel () {
      this.get('newAsset').destroyRecord();
      this.closeModal();
    }
  }
});
