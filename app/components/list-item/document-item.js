import Ember from 'ember';

const { Component, K, computed } = Ember;

const DocumentItemComponent = Component.extend({
  classNames: [ 'item' ],
  classNameBindings: [ 'file.isDeleted:negative' ],
  imagePreview: computed.match('file.extension', /je?pg|png|gif/i),
  onDelete: K,

  actions: {
    delete () {
      this.get('file').destroyRecord().then(this.get('onDelete'));
    }
  }
});

DocumentItemComponent.reopenClass({
  positionalParams: [ 'file' ]
});

export default DocumentItemComponent;
