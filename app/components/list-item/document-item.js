import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';

const { K } = Ember;

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
