import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    addDocument () {
      this.get('onAddition')(this.get('file'));
    },

    removeDocument () {
      this.get('onRemove')(this.get('file'));
    }
  }
});
